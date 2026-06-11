import { createServer } from 'node:http';
import { mkdir, readFile, rename, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const args = new Map();

for (let index = 2; index < process.argv.length; index += 2) {
  const key = process.argv[index];
  const value = process.argv[index + 1];
  if (key?.startsWith('--')) args.set(key, value);
}

function option(name, fallback) {
  return args.get(name) ?? fallback;
}

const host = option('--host', process.env.HOST ?? '0.0.0.0');
const port = Number(option('--port', process.env.PORT ?? '4173'));
const publicDir = resolve(option('--public-dir', process.env.PUBLIC_DIR ?? join(rootDir, 'dist')));
const dataFile = resolve(option('--data-file', process.env.DATA_FILE ?? join(rootDir, 'data', 'shared-state.json')));
const maxBodySize = 10 * 1024 * 1024;

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.map': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

function statePathMatches(pathname) {
  return pathname === '/api/state' || pathname.endsWith('/api/state');
}

async function readCurrentEnvelope() {
  try {
    const text = await readFile(dataFile, 'utf8');
    return JSON.parse(text);
  } catch {
    return {
      revision: 0,
      updatedAt: null,
      state: null,
    };
  }
}

async function writeEnvelope(state) {
  const current = await readCurrentEnvelope();
  const envelope = {
    revision: Number(current.revision ?? 0) + 1,
    updatedAt: new Date().toISOString(),
    state,
  };
  await mkdir(dirname(dataFile), { recursive: true });
  const tempFile = `${dataFile}.tmp`;
  await writeFile(tempFile, JSON.stringify(envelope, null, 2), 'utf8');
  await rename(tempFile, dataFile);
  return envelope;
}

function readRequestBody(request) {
  return new Promise((resolveBody, rejectBody) => {
    const chunks = [];
    let size = 0;

    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > maxBodySize) {
        rejectBody(new Error('Request body is too large'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => resolveBody(Buffer.concat(chunks).toString('utf8')));
    request.on('error', rejectBody);
  });
}

async function handleStateApi(request, response) {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
    });
    response.end();
    return;
  }

  if (request.method === 'GET') {
    sendJson(response, 200, await readCurrentEnvelope());
    return;
  }

  if (request.method === 'PUT') {
    try {
      const body = await readRequestBody(request);
      const payload = JSON.parse(body || '{}');
      const envelope = await writeEnvelope(payload.state ?? payload);
      sendJson(response, 200, envelope);
    } catch (error) {
      sendJson(response, 400, { error: error.message || 'Could not save shared state' });
    }
    return;
  }

  sendJson(response, 405, { error: 'Method not allowed' });
}

async function fileExists(pathname) {
  try {
    const result = await stat(pathname);
    return result.isFile();
  } catch {
    return false;
  }
}

function staticPathFor(pathname) {
  const assetIndex = pathname.indexOf('/assets/');
  if (assetIndex >= 0) return pathname.slice(assetIndex + 1);
  if (pathname === '/' || pathname.endsWith('/') || !extname(pathname)) return 'index.html';
  return pathname.replace(/^\/+/, '');
}

async function serveStatic(request, response, pathname) {
  const relativePath = staticPathFor(pathname);
  const candidate = resolve(publicDir, relativePath);
  const safeCandidate = candidate.startsWith(publicDir) ? candidate : join(publicDir, 'index.html');
  const filePath = (await fileExists(safeCandidate)) ? safeCandidate : join(publicDir, 'index.html');
  const extension = extname(filePath);

  try {
    const content = await readFile(filePath);
    response.writeHead(200, { 'Content-Type': contentTypes[extension] ?? 'application/octet-stream' });
    response.end(content);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Not found');
  }
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
  const pathname = decodeURIComponent(url.pathname);

  if (statePathMatches(pathname)) {
    await handleStateApi(request, response);
    return;
  }

  await serveStatic(request, response, pathname);
});

server.listen(port, host, () => {
  console.log(`R&D Project Operations OS shared server`);
  console.log(`URL: http://${host === '0.0.0.0' ? 'localhost' : host}:${port}/`);
  console.log(`Public directory: ${publicDir}`);
  console.log(`Shared data file: ${dataFile}`);
});
