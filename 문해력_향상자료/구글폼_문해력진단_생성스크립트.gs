/**
 * 문해력 진단 (쉬운 버전) — Google Form 자동 생성 스크립트
 *
 * 사용법
 *  1) https://script.google.com 접속 → [새 프로젝트]
 *  2) 기존 코드 모두 지우고 이 파일 내용을 통째로 붙여넣기
 *  3) 함수 목록에서 createLiteracyForm 선택 → [실행(▶)]
 *  4) 처음이면 권한 승인(내 계정 → 고급 → 이동 → 허용)
 *  5) [실행 로그]의 '응답 URL'을 학생에게 전달
 *
 * ▣ 교사용 정답:  1번 ②   2번 ①   3번 ①   4번 ②
 *    - 1번: 사실 확인   2번: 정의 파악   3번: 관계 파악   4번: 인과 연결
 *    - 5·6번(서술형)이 진짜 지표입니다. 객관식은 찍어서 맞을 수 있어요.
 *      5번 잘함 = '달이 가까워지면 크게 보이는 게 슈퍼문' 처럼 원인+현상이 함께 들어감
 *      6번 잘함 = '관측되는 천체까지의 거리가 가까워지면 각지름이 커진다' 를 정확히 찾음
 *    - 처방: 4개 다 맞고 서술 충실 → 역방향 표적 독해 바로 /
 *            2~3개 → 관계어 표시 훈련부터 / 0~1개 → 스킵 금지, 문단 한 줄 요약부터
 */

var PASSAGE =
  '우리는 가끔 평소보다 큰 보름달인 ‘슈퍼문’을 보게 된다. 실제 달의 크기는 일정한데 왜 이런 일이 생길까? ' +
  '이 현상은 달의 공전 궤도가 타원 궤도라는 점과 관련이 있다.\n\n' +
  '달은 지구를 한 초점으로 하는 타원 궤도를 돌고 있다. 이 궤도에서 지구로부터 가장 먼 지점을 ‘원지점’, ' +
  '가장 가까운 지점을 ‘근지점’이라 한다. 보름달이 근지점이나 그 근처에 위치하면 슈퍼문이 관측된다. ' +
  '슈퍼문은 보름달 중 가장 작게 보이는 것보다 14% 정도 크게 보인다. 이는 지구에서 본 달의 겉보기 지름이 달라졌기 때문이다. ' +
  '지구에서 본 천체의 겉보기 지름을 각도로 나타낸 것을 ‘각지름’이라 하는데, 관측되는 천체까지의 거리가 가까워지면 각지름이 커진다.';

function createLiteracyForm() {
  var form = FormApp.create('문해력 진단 · 슈퍼문')
    .setDescription(
      '이건 시험이 아니에요! 여러분이 글을 어떻게 읽는지 알아보고, 수업을 여러분에게 맞추기 위한 것입니다.\n' +
      '점수는 어디에도 기록되지 않아요. 배경지식도 전혀 필요 없어요 — 답은 모두 글 안에 있습니다.\n' +
      '모르면 찍지 말고 그냥 두어도 좋아요. 10분이면 충분합니다.')
    .setProgressBar(true)
    .setCollectEmail(false);

  /* ── 1. 이름 ── */
  form.addTextItem().setTitle('이름').setRequired(true);

  /* ── 2. 읽기 습관 (3문항) ── */
  form.addPageBreakItem().setTitle('1부. 나의 읽기 습관')
    .setHelpText('편하게 골라 주세요. 정답이 없어요.');

  form.addMultipleChoiceItem().setTitle('긴 글(2쪽 이상)을 읽을 때 나는')
    .setChoiceValues(['끝까지 잘 읽는다', '중간에 집중이 흐트러진다', '거의 못 읽는다']);

  form.addMultipleChoiceItem().setTitle('시험에서 지문을 읽을 때 나는')
    .setChoiceValues(['지문부터 읽는다', '문제부터 읽는다', '그때그때 다르다']);

  form.addMultipleChoiceItem().setTitle('과학·기술 관련 글은 나에게')
    .setChoiceValues(['재미있다', '보통이다', '어렵고 부담된다']);

  /* ── 3. 지문 + 문제 ── */
  form.addPageBreakItem().setTitle('2부. 다음 글을 읽고 답해 주세요')
    .setHelpText(PASSAGE);

  var q1 = form.addMultipleChoiceItem();
  q1.setTitle('1. 슈퍼문은 언제 볼 수 있나요?')
    .setChoiceValues([
      '보름달이 원지점에 있을 때',
      '보름달이 근지점이나 그 근처에 있을 때',   // 정답
      '달이 실제로 커질 때',
      '초승달이 뜰 때']);

  var q2 = form.addMultipleChoiceItem();
  q2.setTitle('2. ‘근지점’은 어떤 곳인가요?')
    .setChoiceValues([
      '지구에서 달까지 가장 가까운 지점',        // 정답
      '지구에서 달까지 가장 먼 지점',
      '달이 가장 밝게 보이는 지점',
      '태양과 달이 겹쳐 보이는 지점']);

  var q3 = form.addMultipleChoiceItem();
  q3.setTitle('3. 천체까지의 거리가 가까워지면 각지름은 어떻게 되나요?')
    .setChoiceValues([
      '커진다',                                  // 정답
      '작아진다',
      '변하지 않는다',
      '글에 나와 있지 않다']);

  var q4 = form.addMultipleChoiceItem();
  q4.setTitle('4. 슈퍼문이 더 크게 “보이는” 이유는 무엇인가요?')
    .setChoiceValues([
      '달의 실제 크기가 커져서',
      '달이 가까워져서 각지름이 커져서',          // 정답
      '햇빛이 더 강해져서',
      '지구가 자전해서']);

  form.addParagraphTextItem()
    .setTitle('5. 이 글을 한 문장으로 요약해 보세요.')
    .setHelpText('짧아도 좋아요. 자기 말로 써 주세요.');

  form.addParagraphTextItem()
    .setTitle('6. 4번 답의 근거가 되는 문장을 글에서 그대로 찾아 써 주세요.')
    .setHelpText('글에 있는 문장을 그대로 옮겨 쓰면 됩니다.');

  /* ── 4. 다 풀고 나서 (3문항) ── */
  form.addPageBreakItem().setTitle('3부. 다 풀고 나서')
    .setHelpText('솔직하게 답해 주세요. 이게 수업 준비에 제일 큰 도움이 돼요.');

  form.addTextItem().setTitle('푸는 데 걸린 시간은? (예: 7분)');

  form.addMultipleChoiceItem().setTitle('나는 이렇게 읽었어요')
    .setChoiceValues(['처음부터 끝까지 정독', '문제 먼저 보고 지문을 읽음', '대충 훑고 문제부터']);

  form.addParagraphTextItem()
    .setTitle('가장 어려웠던 문장이나, 뜻을 모르겠던 단어가 있으면 적어 주세요 (없으면 비워도 돼요)');

  /* ── URL 출력 ── */
  Logger.log('■ 편집 URL(내가 수정): ' + form.getEditUrl());
  Logger.log('■ 응답 URL(학생에게 배포): ' + form.getPublishedUrl());
}
