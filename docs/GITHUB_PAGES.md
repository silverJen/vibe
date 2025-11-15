# GitHub Pages 배포 가이드

이 문서는 Vibe Writing 프로젝트를 GitHub Pages에 배포하는 방법을 설명합니다.

## 📋 목차

- [개요](#개요)
- [수동 배포](#수동-배포)
- [자동 배포 (GitHub Actions)](#자동-배포-github-actions)
- [설정 확인](#설정-확인)
- [문제 해결](#문제-해결)

## 개요

이 프로젝트는 GitHub Pages를 사용하여 정적 웹사이트를 호스팅합니다. 빌드된 파일은 `docs/` 디렉토리에 생성되며, GitHub Pages는 이 디렉토리를 자동으로 서빙합니다.

### 현재 설정

- **빌드 출력 디렉토리**: `docs/` (프로젝트 루트)
- **Base 경로**: `/vibe/` (GitHub Pages URL 경로)
- **배포 URL**: `https://[username].github.io/vibe/`

## 수동 배포

### 1. 프로젝트 빌드

```bash
cd landing-page
npm install
npm run build
```

빌드가 완료되면 `docs/` 디렉토리에 정적 파일이 생성됩니다.

### 2. 변경사항 커밋 및 푸시

```bash
git add docs/
git commit -m "build: update GitHub Pages"
git push origin main
```

### 3. GitHub Pages 설정 확인

1. GitHub 저장소로 이동
2. **Settings** → **Pages** 메뉴로 이동
3. **Source** 섹션에서:
   - **Branch**: `main` 선택
   - **Folder**: `/docs` 선택
4. **Save** 클릭

### 4. 배포 확인

몇 분 후 다음 URL에서 사이트를 확인할 수 있습니다:
- `https://[username].github.io/vibe/`

> **참고**: 첫 배포는 최대 10분 정도 걸릴 수 있습니다.

## 자동 배포 (GitHub Actions)

GitHub Actions를 사용하면 `main` 브랜치에 푸시할 때마다 자동으로 배포됩니다.

### 설정 방법

1. `.github/workflows/deploy.yml` 파일이 이미 생성되어 있는지 확인
2. GitHub 저장소의 **Settings** → **Actions** → **General**에서:
   - **Workflow permissions**를 **Read and write permissions**로 설정
   - **Allow GitHub Actions to create and approve pull requests** 체크

### 워크플로우 동작

- `main` 브랜치에 푸시될 때마다 자동 실행
- `landing-page/` 디렉토리에서 빌드 실행
- 빌드 결과를 `docs/` 디렉토리에 생성
- 변경사항을 자동으로 커밋 및 푸시

### 배포 상태 확인

1. GitHub 저장소의 **Actions** 탭에서 배포 상태 확인
2. 녹색 체크마크가 표시되면 배포 성공
3. 빨간 X가 표시되면 로그를 확인하여 문제 해결

## 설정 확인

### Vite 설정

`landing-page/vite.config.ts` 파일에서 다음 설정을 확인하세요:

```typescript
export default defineConfig({
  base: '/vibe/',      // GitHub Pages 경로
  build: {
    outDir: '../docs', // 빌드 출력 디렉토리
  },
})
```

### Base 경로 변경

만약 GitHub Pages URL 경로를 변경하고 싶다면:

1. `vite.config.ts`의 `base` 값을 변경
2. GitHub 저장소 이름과 일치하도록 설정
   - 저장소 이름이 `vibe`인 경우: `base: '/vibe/'`
   - 저장소 이름이 `my-project`인 경우: `base: '/my-project/'`
   - 루트 도메인을 사용하는 경우: `base: '/'`

## 문제 해결

### 404 에러가 발생하는 경우

1. **Base 경로 확인**: `vite.config.ts`의 `base` 값이 올바른지 확인
2. **빌드 확인**: `docs/` 디렉토리에 파일이 제대로 생성되었는지 확인
3. **GitHub Pages 설정 확인**: Settings → Pages에서 `/docs` 폴더가 선택되어 있는지 확인

### 자산(이미지, CSS 등)이 로드되지 않는 경우

1. **상대 경로 사용**: 절대 경로 대신 상대 경로 사용
2. **Base 경로 확인**: `vite.config.ts`의 `base` 설정 확인
3. **빌드 후 확인**: `docs/index.html`에서 자산 경로가 올바른지 확인

### GitHub Actions 배포가 실패하는 경우

1. **Actions 탭 확인**: 실패한 워크플로우의 로그 확인
2. **권한 확인**: Settings → Actions → General에서 권한 설정 확인
3. **토큰 확인**: GITHUB_TOKEN이 올바르게 설정되어 있는지 확인

### 빌드가 느린 경우

1. **의존성 캐싱**: GitHub Actions에서 `node_modules` 캐싱 사용
2. **빌드 최적화**: 불필요한 의존성 제거
3. **증분 빌드**: 변경된 파일만 빌드하도록 설정

## 추가 리소스

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [Vite 정적 사이트 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Actions 문서](https://docs.github.com/en/actions)

## 관련 파일

- `landing-page/vite.config.ts`: Vite 빌드 설정
- `.github/workflows/deploy.yml`: GitHub Actions 배포 워크플로우
- `docs/`: 빌드된 정적 파일 디렉토리
