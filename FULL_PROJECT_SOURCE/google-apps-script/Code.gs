const FOLDER_NAME = 'R&D Project Operations OS';
const STATE_FILE_NAME = 'rd-project-ops-shared-state.json';
const CHANGE_LOG_FILE_NAME = 'rd-project-ops-change-log.jsonl';
const OPENAI_RESPONSES_URL = 'https://api.openai.com/v1/responses';
const DEFAULT_OPENAI_MODEL = 'gpt-5.5-pro';

function doGet(event) {
  const params = event.parameter || {};
  const callback = params.callback;
  const action = params.action || 'read';
  const payload = action === 'ping'
    ? { ok: true, updatedAt: new Date().toISOString() }
    : action === 'chatgpt'
      ? handleChatGpt_(parsePayload_(params.payload))
      : readStateEnvelope_();

  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${JSON.stringify(payload)});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return jsonOutput_(payload);
}

function doPost(event) {
  const action = (event.parameter && event.parameter.action) || 'write';
  const payloadText = (event.parameter && event.parameter.payload) || (event.postData && event.postData.contents) || '{}';
  const payload = parsePayload_(payloadText);

  if (action === 'chatgpt') {
    return jsonOutput_(handleChatGpt_(payload));
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const envelope = writeStateEnvelope_(payload.state || payload);
    appendChangeLog_(envelope);
    return jsonOutput_(envelope);
  } catch (error) {
    return jsonOutput_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

function parsePayload_(payloadText) {
  if (!payloadText) return {};
  if (typeof payloadText === 'object') return payloadText;
  try {
    return JSON.parse(payloadText);
  } catch (error) {
    return { prompt: String(payloadText) };
  }
}

function handleChatGpt_(payload) {
  try {
    const scriptProperties = PropertiesService.getScriptProperties();
    const apiKey = scriptProperties.getProperty('OPENAI_API_KEY');
    if (!apiKey) {
      return {
        ok: false,
        error: 'Apps Script Script Properties에 OPENAI_API_KEY가 설정되어 있지 않습니다.',
      };
    }

    const model = String(scriptProperties.getProperty('OPENAI_MODEL') || payload.model || DEFAULT_OPENAI_MODEL).trim();
    const prompt = trimText_(payload.prompt, 5000);
    const context = trimText_(payload.context, 8000);
    const user = trimText_(payload.user, 120);
    const requestBody = {
      model,
      input: [
        '당신은 화장품용 무기 소재 연구개발팀의 업무지원 AI입니다.',
        '연구개발과제 기획 및 수행, 지원사업, 특허/IP, 시험·분석 의뢰, 예산·장비, 성과·기술료, 연구소 행정 문서를 한국어로 실무형 문체로 작성합니다.',
        '확인되지 않은 사실은 단정하지 말고, 사용자가 검토해야 할 항목은 별도로 구분합니다.',
        '',
        `[사용자]\n${user || '-'}`,
        '',
        `[업무 컨텍스트]\n${context || '-'}`,
        '',
        `[요청]\n${prompt || '-'}`,
      ].join('\n'),
    };

    const response = UrlFetchApp.fetch(OPENAI_RESPONSES_URL, {
      method: 'post',
      contentType: 'application/json',
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
      payload: JSON.stringify(requestBody),
      muteHttpExceptions: true,
    });
    const status = response.getResponseCode();
    const responseText = response.getContentText();
    const responseJson = responseText ? JSON.parse(responseText) : {};

    if (status >= 400) {
      return {
        ok: false,
        status,
        error: responseJson.error && responseJson.error.message ? responseJson.error.message : responseText,
      };
    }

    return {
      ok: true,
      model,
      answer: extractOpenAiText_(responseJson),
      responseId: responseJson.id || '',
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    return {
      ok: false,
      error: String(error && error.message ? error.message : error),
    };
  }
}

function extractOpenAiText_(responseJson) {
  if (responseJson.output_text) return responseJson.output_text;

  const chunks = [];
  const output = Array.isArray(responseJson.output) ? responseJson.output : [];
  output.forEach((item) => {
    const content = Array.isArray(item.content) ? item.content : [];
    content.forEach((part) => {
      if (typeof part.text === 'string') chunks.push(part.text);
      if (typeof part.output_text === 'string') chunks.push(part.output_text);
    });
  });

  return chunks.join('\n\n') || JSON.stringify(responseJson);
}

function trimText_(value, maxLength) {
  const text = String(value || '');
  return text.length > maxLength ? text.slice(0, maxLength) + '\n...[truncated]' : text;
}

function readStateEnvelope_() {
  const stateFile = getFile_(STATE_FILE_NAME);
  if (!stateFile) {
    return {
      revision: 0,
      updatedAt: null,
      state: null,
    };
  }

  try {
    return JSON.parse(stateFile.getBlob().getDataAsString('UTF-8'));
  } catch (error) {
    return {
      revision: 0,
      updatedAt: null,
      state: null,
      error: 'State file could not be parsed.',
    };
  }
}

function writeStateEnvelope_(state) {
  const current = readStateEnvelope_();
  const envelope = {
    revision: Number(current.revision || 0) + 1,
    updatedAt: new Date().toISOString(),
    state: state,
  };
  const content = JSON.stringify(envelope, null, 2);
  const folder = getFolder_();
  const existing = getFile_(STATE_FILE_NAME);

  if (existing) {
    existing.setContent(content);
  } else {
    folder.createFile(STATE_FILE_NAME, content, MimeType.JSON);
  }

  return envelope;
}

function appendChangeLog_(envelope) {
  const folder = getFolder_();
  const logLine = JSON.stringify({
    revision: envelope.revision,
    updatedAt: envelope.updatedAt,
    counts: {
      workItems: count_(envelope.state.workItems),
      teamCheckins: count_(envelope.state.teamCheckins),
      testInstitutions: count_(envelope.state.testInstitutions),
      patents: count_(envelope.state.patents),
      budgetRows: count_(envelope.state.budgetRows),
      completedWorkLogs: count_(envelope.state.completedWorkLogs),
      workComments: count_(envelope.state.workComments),
    },
  }) + '\n';
  const existing = getFile_(CHANGE_LOG_FILE_NAME);

  if (existing) {
    existing.setContent(existing.getBlob().getDataAsString('UTF-8') + logLine);
  } else {
    folder.createFile(CHANGE_LOG_FILE_NAME, logLine, MimeType.PLAIN_TEXT);
  }
}

function count_(value) {
  return Array.isArray(value) ? value.length : 0;
}

function getFolder_() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  return folders.hasNext() ? folders.next() : DriveApp.createFolder(FOLDER_NAME);
}

function getFile_(name) {
  const files = getFolder_().getFilesByName(name);
  return files.hasNext() ? files.next() : null;
}

function jsonOutput_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
