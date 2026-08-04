/**
 * 독서멘토링 1차시 요구파악 설문 — Google Form 자동 생성 스크립트
 *
 * 사용법
 *  1) https://script.google.com 접속 → [새 프로젝트]
 *  2) 기존 코드를 모두 지우고 이 파일 내용을 통째로 붙여넣기
 *  3) 상단 함수 목록에서 createMentoringForm 선택 → [실행(▶)]
 *  4) 처음이면 권한 승인(내 계정 선택 → 고급 → 이동 → 허용)
 *  5) [실행 로그]에 뜨는 '편집 URL / 응답 URL'을 복사해 사용
 *
 * 만들어지는 폼: 섹션 5개, 2번은 1~4순위 그리드(한 순위에 하나씩 강제)
 */
function createMentoringForm() {
  var form = FormApp.create('독서멘토링 첫 시간 · 나를 알려주세요')
    .setDescription('이 멘토링을 여러분에게 꼭 맞게 설계하기 위한 질문입니다. 정답은 없어요. 솔직하게 적어 주세요.')
    .setProgressBar(true)
    .setCollectEmail(false)
    .setAllowResponseEdits(true);

  /* ── 1. 기본 정보 ── */
  form.addSectionHeaderItem().setTitle('1. 기본 정보');

  form.addTextItem().setTitle('이름').setRequired(true);

  var school = form.addMultipleChoiceItem();
  school.setTitle('학교 유형')
    .setChoices([school.createChoice('일반고'), school.createChoice('특성화고')])
    .showOtherOption(true)   // '기타(____)' 직접 입력
    .setRequired(true);

  form.addTextItem().setTitle('학년 / 전공(학과)');
  form.addTextItem().setTitle('희망 진로 · 관심 계열');

  /* ── 2. 가장 얻고 싶은 것 (순위) ── */
  form.addPageBreakItem()
    .setTitle('2. 이 멘토링에서 가장 얻고 싶은 것')
    .setHelpText('네 가지 항목을 원하는 정도에 따라 순위로 표시해 주세요. (1순위 = 가장 원함)');

  var grid = form.addGridItem();
  grid.setTitle('아래 4가지를 순위로 매겨 주세요')
    .setRows([
      '생활기록부에 ‘독서’를 잘 녹여내는 방법을 알고 싶다',
      '비문학·수능 지문 같은 글을 잘 읽어내는 문해력을 키우고 싶다',
      '바이브코딩(AI 코딩)처럼 남들과 다른 색다른 산출물을 만들고 싶다',
      '이공계 진로를 구체적으로 탐색하고 싶다'
    ])
    .setColumns(['1순위', '2순위', '3순위', '4순위'])
    .setRequired(true);
  // 한 순위(열)에는 하나만 선택되도록 강제 → 진짜 순위가 됨
  grid.setValidation(
    FormApp.createGridValidation()
      .setHelpText('한 순위(열)에는 하나만 선택할 수 있어요.')
      .requireLimitOneResponsePerColumn()
      .build()
  );

  form.addParagraphTextItem()
    .setTitle('각 항목을 그렇게 정한 이유가 있다면 자유롭게 적어 주세요 (선택)');

  form.addTextItem().setTitle('그 외에 바라는 것이 있다면 (선택)');

  /* ── 3. 독서·과학·코딩 경험 ── */
  form.addPageBreakItem().setTitle('3. 나의 독서 · 과학 · 코딩 경험');

  form.addMultipleChoiceItem().setTitle('평소 독서량')
    .setChoiceValues(['거의 안 읽음', '가끔', '즐겨 읽음']);

  form.addTextItem().setTitle('좋아하는(또는 궁금한) 과학 분야')
    .setHelpText('예) 우주·천문, 생명·의학, 물리, 화학, 인공지능·컴퓨터, 지구·환경, 로봇·공학 ...');

  form.addMultipleChoiceItem().setTitle('코딩 경험')
    .setChoiceValues(['전혀 없음', '블록코딩/약간', '파이썬 등 해봄']);

  form.addMultipleChoiceItem().setTitle('수업에 쓸 노트북/PC')
    .setChoiceValues(['개인 것 있음', '학교/대여 필요', '스마트폰만 가능']);

  /* ── 4. 특성화고 학생 추가 문항 ── */
  form.addPageBreakItem()
    .setTitle('4. 특성화고 학생에게 추가로 묻습니다')
    .setHelpText('일반고 학생은 건너뛰어도 좋아요.');

  form.addMultipleChoiceItem().setTitle('졸업 후 방향')
    .setChoiceValues(['취업 중심', '진학 중심', '아직 고민 중']);

  form.addTextItem().setTitle('나의 전공 / 취득했거나 준비 중인 자격증');

  form.addMultipleChoiceItem()
    .setTitle('이 활동이 내 전공(IT·디자인·기계·보건 등)과 연결되면 좋겠는가?')
    .setChoiceValues(['예', '아니오']);

  /* ── 5. 자유롭게 ── */
  form.addPageBreakItem()
    .setTitle('5. 자유롭게')
    .setHelpText('이 10주가 끝났을 때, ‘이건 꼭 얻어 가면 좋겠다’ 싶은 것을 한 문장으로 적어 주세요.');

  form.addParagraphTextItem().setTitle('나의 한 문장');

  /* ── 결과 URL 출력 ── */
  Logger.log('■ 편집 URL(내가 수정): ' + form.getEditUrl());
  Logger.log('■ 응답 URL(학생에게 배포): ' + form.getPublishedUrl());
}
