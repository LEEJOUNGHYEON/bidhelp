# BIDHELP 모바일 홍보 사이트

곽소영 팀장용 모바일 우선 디지털 명함/홍보 사이트입니다.

## 파일 구조

```text
bidhelp-card/
├─ index.html
├─ styles.css
├─ .nojekyll
└─ assets/
   ├─ bidhelp-intro-mobile.mp4
   ├─ video-poster.jpg
   └─ bidhelp-info.jpg
```

## VS Code에서 확인

1. 폴더를 VS Code로 엽니다.
2. `index.html`을 브라우저에서 열거나 VS Code의 Live Server 확장으로 실행합니다.
3. 모바일 화면 확인은 Chrome 개발자도구의 Device Toolbar를 사용하면 됩니다.

## GitHub Pages 배포

1. GitHub에서 새 저장소를 만듭니다. 예: `bidhelp-card`
2. 이 폴더 안의 파일을 저장소 루트에 업로드/푸시합니다.
3. GitHub 저장소에서 **Settings → Pages**로 이동합니다.
4. **Build and deployment → Source**를 `Deploy from a branch`로 선택합니다.
5. Branch를 `main`, 폴더를 `/ (root)`로 선택 후 저장합니다.
6. 잠시 후 `https://사용자명.github.io/bidhelp-card/` 형태로 공개됩니다.

## 수정하기 좋은 위치

- 담당자/전화번호: `index.html`에서 `곽소영`, `010-2987-7208` 검색
- 대표전화: `02-6737-3680`
- 이메일: `ktrsad@daum.net`
- 회사 주소: footer 영역
- 실적 숫자: `성과로 확인하는 비드헬프` 영역
- 색상: `styles.css`의 `:root` 변수

## 모바일 영상

원본 1080p 약 60MB 영상을 모바일 페이지용 720p 약 4MB로 압축해 두었습니다. 자동재생은 하지 않고 `preload="metadata"`로 설정해 페이지 첫 로딩을 가볍게 유지합니다.

## 다음 권장 작업

- 카카오톡 상담 링크가 있으면 전화/문자 버튼 옆에 추가
- 실제 회사 로고 원본(PNG/SVG)이 있으면 상단 임시 심볼 교체
- GitHub Pages URL 확정 후 QR 코드 제작
- 필요하면 맞춤 도메인 연결
