# MainBanner 리팩토링

## 변경 내용

- 중복된 `indPlus`, `indMinus` 제거
  - 기존 `nextBanner`, `preBanner`로 기능 통합

- 이전/다음 인덱스 계산 단순화
  - 조건문 대신 나머지 연산을 사용해 순환 인덱스 계산

- 애니메이션 로직 분리
  - `imgIdx` 변경 후 애니메이션 실행을 `useEffect`에서 처리
  - timeout cleanup 추가

- 자동재생 로직 정리
  - 자동재생 `useEffect`에서는 interval 관리만 담당

- CSS 반응형 수정
  - 미디어쿼리 추가와 rem 단위로 변경
  - `rem` 중심 구조에서 MainBanner 기준 `em` 단위로 변경
  - 다른 컴포넌트에 영향을 주지 않도록 `.mainWrap`의 font-size 기준으로 조절

## 의도된 동작

- 이전/다음 화살표: 슬라이드 애니메이션 적용
- 하단 인디케이터 버튼: 애니메이션 없이 선택한 배너 즉시 표시