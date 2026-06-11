# R&D Project Operations OS Full Package

이 패키지는 전체 소스와 GitHub Pages 배포 파일, Google Apps Script 파일을 함께 담은 완전 패키지입니다.

## 구성

```text
FULL_PROJECT_SOURCE/
UPLOAD_TO_GITHUB_ROOT/
GOOGLE_APPS_SCRIPT/Code.gs
README-FULL-PACKAGE.md
```

## 어떤 파일을 Google Apps Script에 반영하나

반영 파일은 아래 1개입니다.

```text
GOOGLE_APPS_SCRIPT/Code.gs
```

같은 내용이 `FULL_PROJECT_SOURCE/google-apps-script/Code.gs`에도 들어 있습니다.

## 각 폴더 용도

- `FULL_PROJECT_SOURCE/`
  개발 소스 전체입니다. `src`, `public`, `google-apps-script`, `package.json`, `vite.config.mjs` 등이 들어 있습니다.
- `UPLOAD_TO_GITHUB_ROOT/`
  GitHub Pages 저장소 루트에 바로 올릴 정적 배포 파일입니다.
- `GOOGLE_APPS_SCRIPT/Code.gs`
  Google Apps Script 웹 앱에 붙여넣을 파일입니다.

## 현재 기본 모델

기본 모델은 `gpt-5.5-pro`로 설정되어 있습니다.

적용 위치:

- `UPLOAD_TO_GITHUB_ROOT/app-config.js`
- `GOOGLE_APPS_SCRIPT/Code.gs`

## 배포 메모

1. Google Apps Script 프로젝트에 `GOOGLE_APPS_SCRIPT/Code.gs`를 반영합니다.
2. Script Properties에 아래 값을 넣습니다.

```text
OPENAI_API_KEY=사용자 API Key
OPENAI_MODEL=gpt-5.5-pro
```

3. 배포된 Web App URL을 `UPLOAD_TO_GITHUB_ROOT/app-config.js`의 `googleAppsScriptUrl`에 넣습니다.
4. `UPLOAD_TO_GITHUB_ROOT/` 안의 파일들을 GitHub 저장소 루트에 올리면 됩니다.
