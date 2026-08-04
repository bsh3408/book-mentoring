// ===== 나의 첫 웹앱 · 백엔드(주방) =====
// 손님이 웹앱 주소로 들어오면(doGet), 'index.html'을 웹페이지로 내준다.
//
// [사용법]
// 1) script.google.com → 새 프로젝트
// 2) 이 코드를 Code.gs에 붙여넣기
// 3) 파일 + → HTML → 이름을 'index' 로 만들고, 같은 폴더의 index.html 내용 붙여넣기
// 4) 배포 → 새 배포 → 웹 앱 → 액세스 '모든 사용자' → 배포
// 5) 나온 '웹 앱 URL'을 열면 화면이 뜬다.

function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('나의 첫 웹앱')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1'); // ← 반응형의 시작
}
