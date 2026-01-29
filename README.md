# 🔍 팩트체크 앱

어르신을 위한 쉽고 빠른 가짜뉴스 확인 앱입니다.

## ✨ 주요 기능

- ✅ **큰 글씨와 간단한 UI** - 어르신도 쉽게 사용
- 🎤 **음성 입력 지원** - 말로 입력 가능
- 📱 **스마트폰에 설치 가능** - 앱처럼 사용
- 🌐 **완전 무료** - 서버 비용 없음
- 📴 **오프라인 지원** - 인터넷 없이도 기본 기능 사용

## 🚀 사용 방법

### 웹에서 바로 사용하기

1. 브라우저에서 앱 열기
2. 의심스러운 정보 입력 (또는 음성으로 말하기)
3. "확인하기" 버튼 클릭
4. 결과 확인
   - 초록색: 사실
   - 빨간색: 거짓
   - 노란색: 불확실

### 스마트폰에 설치하기

#### Android (Chrome)
1. Chrome 브라우저로 앱 접속
2. 주소창 옆 "설치" 버튼 클릭
3. "설치" 확인
4. 홈 화면에 아이콘 추가됨

#### iOS (Safari)
1. Safari 브라우저로 앱 접속
2. 공유 버튼 (↑) 클릭
3. "홈 화면에 추가" 선택
4. "추가" 클릭

## 💻 로컬에서 실행하기

```bash
# 프로젝트 디렉토리로 이동
cd fact-check-app

# 간단한 HTTP 서버 실행 (Python)
python -m http.server 8000

# 또는 Node.js 사용
npx serve .

# 브라우저에서 열기
# http://localhost:8000
```

## 🌐 배포하기

### GitHub Pages

1. GitHub 저장소 생성
2. 코드 푸시
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/사용자명/저장소명.git
git push -u origin main
```
3. Settings → Pages → Source를 "main" 브랜치로 설정
4. 배포된 URL로 접속

### Netlify

1. [Netlify](https://www.netlify.com/) 가입
2. "New site from Git" 클릭
3. GitHub 저장소 연결
4. 자동 배포 완료

## 📋 프로젝트 구조

```
fact-check-app/
├── index.html          # 메인 페이지
├── manifest.json       # PWA 설정
├── sw.js              # Service Worker
├── css/
│   └── style.css      # 스타일시트
├── js/
│   ├── app.js         # 메인 로직
│   ├── speech.js      # 음성 인식
│   └── factcheck.js   # 팩트체크 기능
└── icons/
    ├── icon-192.png   # 앱 아이콘 (소)
    └── icon-512.png   # 앱 아이콘 (대)
```

## 🔧 기술 스택

- **프론트엔드**: HTML5, CSS3, JavaScript (ES6+)
- **음성 인식**: Web Speech API
- **PWA**: Service Worker, Web App Manifest
- **캐싱**: LocalStorage, Cache API
- **폰트**: Nanum Gothic (한글 최적화)

## ⚠️ 주의사항

- 이 앱은 **참고용**입니다. 100% 정확도를 보장하지 않습니다.
- 중요한 정보는 여러 신뢰할 수 있는 출처에서 교차 확인하세요.
- 음성 인식은 Chrome 브라우저에서 가장 잘 작동합니다.
- 일부 기능은 HTTPS 환경에서만 작동합니다.

## 📊 팩트체크 데이터

현재 포함된 가짜뉴스 데이터:
- 바나나로 코로나 치료
- 마늘로 코로나 예방
- 5G와 코로나 전파
- 뜨거운 물로 코로나 예방
- 표백제/소독제 섭취

더 많은 데이터는 `js/factcheck.js`에서 추가할 수 있습니다.

## 🤝 기여하기

이 프로젝트는 오픈소스입니다. 개선 사항이나 버그 리포트는 언제든 환영합니다!

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 💡 도움말

### 음성 인식이 작동하지 않아요
- Chrome 브라우저를 사용하세요
- 마이크 권한을 허용했는지 확인하세요
- HTTPS 환경에서 실행하세요 (localhost는 예외)

### 앱을 설치할 수 없어요
- HTTPS로 접속했는지 확인하세요
- 브라우저가 PWA를 지원하는지 확인하세요
- 이미 설치되어 있는지 확인하세요

### 팩트체크 결과가 나오지 않아요
- 인터넷 연결을 확인하세요
- 입력한 내용이 데이터베이스에 있는지 확인하세요
- 브라우저 콘솔에서 에러를 확인하세요

## 📞 문의

문제가 있거나 제안사항이 있으시면 이슈를 등록해주세요.

---

**만든 이**: Antigravity AI  
**목적**: 미디어 리터러시 향상을 통한 건강한 정보 생태계 조성
