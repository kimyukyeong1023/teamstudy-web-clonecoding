import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";

/* =========================================================
   1. 외부 설정 데이터 (데이터 구조 정의)
   ========================================================= */

// 새로고침 시 무작위 노출 메뉴 옵션 (메인 네비게이션)
const DYNAMIC_NAV_OPTIONS = [
  {
    name: "Shop",
    url: "https://shop.hyundai.com/section/welcome?utm_source=hyundai_d_com&utm_medium=affiliates&utm_campaign=gnb",
  },
  {
    name: "현대인증중고차",
    url: "https://certified.hyundai.com/p/display/main?utm_source=hyundai.com&utm_ID=GNB&requestURI=%2Flink%2FredirectLink.do",
  },
  {
    name: "Bluelink Store",
    url: "https://commerce.hyundai.com/kr/ko/commerce/fod?utm_source=hyundai_com&utm_medium=web&utm_campaign=homepage_promotion",
  },
];

// 새로고침 시 무작위 노출 메뉴 옵션 (우측 유틸리티 영역)
const DYNAMIC_UTILL_OPTIONS = [
  {
    before: "Hi, ",
    bold: "EV",
    after: "",
    url: "https://www.hyundai.com/kr/ko/e/service-membership/ev/hi-ev",
  },
  {
    before: "사양백과",
    bold: "",
    after: "",
    url: "https://www.hyundai.com/kr/ko/e/vehicles/spec-dictionary?carCode=GN11",
  },
  {
    before: "",
    bold: "Trendy ",
    after: "Hyundai",
    url: "https://www.hyundai.com/kr/ko/e/vehicles/trendy-hyundai",
  },
  {
    before: "",
    bold: "내 차 ",
    after: "추천받기",
    url: "https://www.hyundai.com/kr/ko/e/vehicles/explorer?utm_source=homepage&utm_medium=gnb&utm_campaign=find_mycar",
  },
];

// 검색창 내 인기 검색어 Top 10 목록
const POPULAR_KEYWORDS = [
  "1위. 사양조회",
  "2위. 아반떼",
  "3위. 네비게이션 업데이트",
  "4위. 제네시스",
  "5위. 네비게이션",
  "6위. 캐스퍼",
  "7위. 그랜저",
  "8위. 코나",
  "9위. 스타리아",
  "10위. 현대 제네시스 셀렉션",
];

// 대형 메가 드롭다운 메뉴 카테고리 데이터
const MEGA_MENUS = {
  "구매/이벤트": {
    categories: [
      {
        title: "모델탐색",
        items: ["Trendy Hyundai", "내 차 추천받기", "모델 비교", "사양백과"],
      },
      {
        title: "구매",
        items: [
          "All-in-One 구매 가이드",
          "내 차 만들기(견적)",
          "구매상담신청",
          "카탈로그/가격표",
          "전기/수소차 구매보조금 조회",
          "H Genuine Accessories",
        ],
      },
      {
        title: "전시/시승",
        items: [
          "승용 판매/시승 네트워크",
          "상용 판매 네트워크",
          "시승신청",
          "신규전시장 안내",
        ],
      },
      { title: "구매혜택", items: ["이달의 구매혜택", "특별기획전"] },
      { title: "이벤트", items: ["진행중 이벤트", "구매후기"] },
      {
        title: "정책 안내",
        items: [
          "차량 구매 절차",
          "차량 구매 제도/규정",
          "장애인 차량 구매 가이드",
          "포인트 적립 (신차 구매)",
          "보증수리 안내",
          "자동차 교환환불제도 안내",
          "하자재발 통보서 안내",
          "중고차 가격보장 프로그램",
        ],
      },
      { title: "Shop", items: ["HyundaiShop ↗", "현대 컬렉션 ↗"] },
      {
        title: "내 차 판매/트레이드인",
        items: [
          "인증중고차 바로가기 ↗",
          "내 차 시세 조회 ↗",
          "트레이드-인 혜택 안내 ↗",
        ],
      },
    ],
  },
  "서비스/멤버십": {
    categories: [
      { title: "내 차", items: ["마이페이지", "사양조회", "친환경 폐차"] },
      {
        title: "블루멤버스",
        items: [
          "블루멤버스 소개",
          "Hyundai Mobility 카드",
          "포인트 안내",
          "포인트 적립/사용처",
          "포인트 양도/신청 조회",
          "멤버십 카드 재발급 신청 안내",
          "실 운전자 차량 등록",
          "포인트 정책 변경 안내",
          "패밀리 등록",
          "패밀리 현황",
        ],
      },
      {
        title: "서비스 네트워크 찾기",
        items: [
          "서비스 예약 안내 (ARS)",
          "서비스 네트워크 검색/예약",
          "서비스 네트워크 소개",
          "특장 서비스 네트워크",
          "서비스 기술교육 소개",
          "부품 가격/보유점 조회 ↗",
        ],
      },
      { title: "정비/서비스 프로그램", items: ["올 케어 서비스 맵"] },
      {
        title: "블루핸즈 가맹사업",
        items: [
          "가맹사업 소개",
          "가맹점 개설 안내",
          "가맹점 모집",
          "유형별 블루핸즈",
        ],
      },
      {
        title: "전기차/수소차",
        items: [
          "Hi, EV",
          "2026 EV 에브리케어",
          "EV 비즈 케어",
          "넥쏘 에브리케어",
          "현대 EV 충전 솔루션",
          "현대 N 급속 충전소 충전혜택",
          "전기/수소차 충전소 찾기",
          "전기차 배터리 정보",
        ],
      },
    ],
  },
  "디지털/고객지원": {
    categories: [
      {
        title: "업데이트",
        items: ["차량 소프트웨어 업데이트 ↗", "블루링크 스토어 ↗"],
      },
      {
        title: "디지털 서비스",
        items: [
          "마이현대 앱",
          "블루링크",
          "인카페이먼트",
          "현대 제네시스 셀렉션",
          "운전결심",
          "Hyundai N App",
        ],
      },
      {
        title: "Help Desk",
        items: [
          "고객센터",
          "FAQ (자주하는 질문)",
          "1:1 문의",
          "사용설명서 다운로드 (자료실)",
          "블루링크 고객지원",
          "현대 디지털 키 1 고객지원",
          "인카페이먼트 고객지원",
          "상용 소모품 정보",
          "긴급 대응 가이드 ↗",
        ],
      },
      { title: "공지/뉴스", items: ["공지사항", "뉴스"] },
      { title: "종료된 서비스", items: ["굿 드라이버 프로그램"] },
    ],
  },
  브랜드: {
    categories: [
      {
        title: "브랜드 스토리",
        items: ["브랜드 철학", "브랜드 저널 ↗", "헤리티지", "모델 히스토리"],
      },
      { title: "모터 스포츠", items: ["WRC", "WTCR", "뉘르부르크링 24시"] },
      {
        title: "패밀리 사이트",
        items: [
          "현대 모터스튜디오",
          "드라이빙 익스피리언스 ↗",
          "현대 컬렉션 ↗",
          "인재채용 ↗",
        ],
      },
      {
        title: "사업망",
        items: ["국내 사업망 소개", "해외 사업망 소개 ↗", "공장 견학"],
      },
      {
        title: "포레스트런",
        items: ["포레스트런 소개", "히스토리", "참가신청"],
      },
    ],
  },
};

export default function Header() {
  /* =========================================================
     2. 상태(State) 및 Hook 정의
     ========================================================= */

  // 무작위 선택 메뉴 상태
  const [navMenu, setNavMenu] = useState(DYNAMIC_NAV_OPTIONS[0]);
  const [utillMenu, setUtillMenu] = useState(DYNAMIC_UTILL_OPTIONS[0]);

  // 스크롤 감지 및 상단 진행바 상태
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // 드롭다운 메뉴 및 검색 레이어 활성화 상태
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 메뉴 밑 슬라이딩 인디케이터 스타일 및 Ref
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRefs = useRef({});

  /* =========================================================
     3. Effect 처리 (초기화, 스크롤 감지, 슬라이더 계산)
     ========================================================= */

  // 랜더링 초기화 및 스크롤 이벤트 등록
  useEffect(() => {
    // 렌더링 시 무작위 메뉴 선발
    setNavMenu(
      DYNAMIC_NAV_OPTIONS[
        Math.floor(Math.random() * DYNAMIC_NAV_OPTIONS.length)
      ],
    );
    setUtillMenu(
      DYNAMIC_UTILL_OPTIONS[
        Math.floor(Math.random() * DYNAMIC_UTILL_OPTIONS.length)
      ],
    );

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 활성화된 메뉴 버튼 위치 추적하여 인디케이터(파란 박스) 위치 재계산
  useEffect(() => {
    if (activeMenu && navRefs.current[activeMenu]) {
      const el = navRefs.current[activeMenu];
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeMenu]);

  /* =========================================================
     4. 이벤트 핸들러 함수
     ========================================================= */

  // 메인 메뉴 버튼 토글 핸들러
  const handleMenuClick = (menuName) => {
    setIsSearchOpen(false); // 검색창 활성화 시 닫기
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  // 돋보기 버튼 토글 핸들러
  const handleSearchToggle = () => {
    setActiveMenu(null); // 메가드롭다운 활성화 시 닫기
    setIsSearchOpen((prev) => !prev);
  };

  // 모든 드롭다운 및 모달 닫기
  const handleCloseAll = () => {
    setActiveMenu(null);
    setIsSearchOpen(false);
  };

  /* =========================================================
     5. JSX 랜더링 구조
     ========================================================= */
  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
          activeMenu || isSearchOpen ? styles.menuActive : ""
        }`}
      >
        {/* 스크롤 진행바 (메뉴나 검색창이 열려있지 않을 때만 표시) */}
        {!activeMenu && !isSearchOpen && (
          <div
            className={styles.progressBar}
            style={{ width: `${scrollProgress}%` }}
          />
        )}

        <div className={styles.headerInner}>
          {/* [좌측] 로고 + 메인 네비게이션 영역 */}
          <div className={styles.leftBox}>
            <div className={styles.logoArea}>
              <h1 className={styles.logoHeading}>
                <button
                  type="button"
                  className={styles.logoBtn}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  <svg
                    width="48"
                    height="22"
                    viewBox="0 0 45 23"
                    className={styles.logoIcon}
                  >
                    <path
                      d="M22.29,22.83c12.31,0,22.29-5.11,22.29-11.42C44.59,5.11,34.61,0,22.29,0C9.98,0,0,5.11,0,11.41 C0,17.72,9.98,22.83,22.29,22.83z M26.49,17.23c-0.37,0.86-1.01,2.7-2.48,3.44c-0.44,0.22-0.99,0.33-1.49,0.34 c-0.11,0-0.19,0-0.22,0c-4.12,0-7.94-0.57-11.15-1.55c-0.03-0.01-0.1-0.04-0.12-0.05c-0.3-0.1-0.45-0.24-0.45-0.4 c0-0.15,0.08-0.26,0.18-0.36c0.04-0.05,0.11-0.1,0.2-0.18c0.74-0.62,2.97-2.23,7.17-3.84c1.47-0.56,3.31-1.26,5.25-1.67 C24.51,12.72,28.7,12.08,26.49,17.23z M37.75,5.72c0.08-0.14,0.19-0.25,0.38-0.27c0.1-0.01,0.25,0.02,0.46,0.15 c2.62,1.61,4.17,3.62,4.17,5.8c0,3.94-5.06,7.32-12.3,8.8c-0.47,0.09-0.77,0.09-0.88-0.03c-0.07-0.07-0.09-0.2,0-0.35 c0.05-0.08,0.1-0.15,0.19-0.27c3.94-4.65,6.94-11.5,7.8-13.48C37.64,5.95,37.7,5.81,37.75,5.72z M18.16,5.58 c0.37-0.86,1.01-2.7,2.48-3.43c0.45-0.22,0.99-0.33,1.49-0.34c0.11,0,0.19,0,0.22,0c4.12,0,7.94,0.57,11.15,1.55 c0.02,0.01,0.1,0.04,0.12,0.04c0.3,0.1,0.45,0.23,0.45,0.4c0,0.15-0.08,0.26-0.18,0.36c-0.05,0.04-0.11,0.1-0.2,0.18 c-0.74,0.62-2.97,2.23-7.17,3.84c-1.47,0.56-3.32,1.26-5.24,1.67C20.14,10.09,15.95,10.73,18.16,5.58z M14.12,2.61 c0.47-0.09,0.77-0.09,0.88,0.03c0.06,0.07,0.08,0.2,0,0.35c-0.05,0.08-0.1,0.16-0.19,0.27c-3.94,4.65-6.94,11.5-7.8,13.48 c-0.06,0.14-0.13,0.27-0.18,0.36c-0.08,0.14-0.18,0.26-0.37,0.27c-0.11,0.01-0.25-0.02-0.47-0.15 c-2.62-1.61-4.17-3.62-4.17-5.8C1.82,7.48,6.88,4.09,14.12,2.61z"
                      fill="#002c5f"
                    />
                  </svg>
                  <span className={styles.logoText}>HYUNDAI</span>
                </button>
              </h1>
            </div>

            <nav className={styles.mainNav}>
              <ul className={styles.navList}>
                <li>
                  <a
                    href="https://www.hyundai.com/kr/ko/e/all-vehicles"
                    className={styles.navLink}
                  >
                    모델
                  </a>
                </li>

                {[
                  "구매/이벤트",
                  "서비스/멤버십",
                  "디지털/고객지원",
                  "브랜드",
                ].map((menuName) => (
                  <li key={menuName}>
                    <button
                      type="button"
                      ref={(el) => (navRefs.current[menuName] = el)}
                      className={`${styles.navBtn} ${
                        activeMenu === menuName ? styles.activeNavBtn : ""
                      }`}
                      onClick={() => handleMenuClick(menuName)}
                    >
                      {menuName}
                    </button>
                  </li>
                ))}

                <li>
                  <a href={navMenu.url} className={styles.navLink}>
                    {navMenu.name}
                  </a>
                </li>

                {/* 슬라이딩 인디케이터 하이라이트 박스 */}
                <span className={styles.navIndicator} style={indicatorStyle} />
              </ul>
            </nav>
          </div>

          {/* [우측] 유틸리티 영역 (언어, 로그인, 검색, 전체메뉴) */}
          <div className={styles.utillArea}>
            <a href={utillMenu.url} className={styles.evLink}>
              {utillMenu.before}
              <b>{utillMenu.bold}</b>
              {utillMenu.after}
            </a>

            {/* KR 언어 선택 드롭다운 */}
            <div className={styles.langWrapper}>
              <button type="button" className={styles.langBtn}>
                KR <span className={styles.arrowIcon}>▾</span>
              </button>
              <div className={styles.langDropdown}>
                <ul className={styles.dropdownList}>
                  <li>
                    <a href="#none" className={styles.langLink}>
                      EN
                    </a>
                  </li>
                  <li>
                    <a href="#none" className={styles.langLink}>
                      CN
                    </a>
                  </li>
                  <li>
                    <a href="#none" className={styles.langLink}>
                      월드와이드
                    </a>
                  </li>
                  <li>
                    <a href="#none" className={styles.langLink}>
                      상용글로벌
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <span className={styles.divider}></span>

            {/* 로그인 아이콘 드롭다운 */}
            <div className={styles.loginWrapper}>
              <button
                type="button"
                className={styles.iconBtn}
                aria-label="로그인"
              >
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#1c1c1c"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="4" />
                  <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" />
                </svg>
              </button>
              <div className={styles.loginDropdown}>
                <ul className={styles.dropdownList}>
                  <li>
                    <a href="#none" className={styles.loginLink}>
                      개인 로그인{"\u00A0\u00A0\u00A0"}&gt;
                    </a>
                  </li>
                  <li>
                    <a href="#none" className={styles.loginLink}>
                      법인 로그인{"\u00A0\u00A0\u00A0"}&gt;
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* 돋보기 (검색창 토글) 버튼 */}
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="검색"
              onClick={handleSearchToggle}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1c1c1c"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* 전체메뉴 (링크 이동) 버튼 */}
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="전체메뉴"
              onClick={() => {
                window.location.href =
                  "https://www.hyundai.com/kr/ko/e/menu-list";
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1c1c1c"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="7" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* 🔍 검색 레이어 패널 */}
        {isSearchOpen && (
          <div className={styles.searchLayer}>
            <div className={styles.searchBarContainer}>
              <div className={styles.searchInputBox}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="검색어를 입력해주세요."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className={styles.searchClearBtn}
                    onClick={() => setSearchQuery("")}
                    aria-label="지우기"
                  >
                    ✕
                  </button>
                )}
                <button
                  type="button"
                  className={styles.searchIconBtn}
                  aria-label="검색 실행"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#1c1c1c"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                className={styles.searchCloseBtn}
                onClick={() => setIsSearchOpen(false)}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className={styles.searchContentContainer}>
              <div className={styles.searchContentBox}>
                {/* 최근 검색어 구역 */}
                <div className={styles.recentSearchSection}>
                  <div className={styles.searchSectionHeader}>
                    <span className={styles.searchSectionTitle}>
                      최근 검색어
                    </span>
                    <button type="button" className={styles.clearHistoryBtn}>
                      검색기록 삭제
                    </button>
                  </div>
                </div>

                {/* 인기 검색어 구역 */}
                <div className={styles.popularSearchSection}>
                  <div className={styles.searchSectionHeader}>
                    <span className={styles.searchSectionTitle}>
                      인기 검색어 Top10
                    </span>
                  </div>
                  <ul className={styles.popularList}>
                    {POPULAR_KEYWORDS.map((item, idx) => (
                      <li key={idx} className={styles.popularItem}>
                        <a href="#none" className={styles.popularLink}>
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className={styles.autoCompleteFooter}>
                    <button type="button" className={styles.autoCompleteBtn}>
                      자동 완성 끄기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🍔 대형 메가 드롭다운 패널 */}
        {activeMenu && MEGA_MENUS[activeMenu] && (
          <div className={styles.megaDropdown}>
            <button
              type="button"
              className={styles.megaCloseBtn}
              onClick={() => setActiveMenu(null)}
              aria-label="닫기"
            >
              ✕
            </button>

            <div className={styles.megaInner}>
              <div className={styles.megaGrid}>
                {MEGA_MENUS[activeMenu].categories.map((cat, idx) => (
                  <div key={idx} className={styles.megaRow}>
                    <div className={styles.categoryTitle}>{cat.title}</div>
                    <div className={styles.categoryItems}>
                      {cat.items.map((item, itemIdx) => (
                        <a
                          key={itemIdx}
                          href="#none"
                          className={styles.megaLink}
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* 하단 프로모션 배너 구역 */}
              <div className={styles.megaBannerArea}>
                <div className={styles.bannerCard}>
                  <div className={styles.bannerThumb}>📱</div>
                  <div className={styles.bannerInfo}>
                    <strong className={styles.bannerTitle}>
                      현대 제네시스 셀렉션 친구초대 이벤트
                    </strong>
                    <span className={styles.bannerDate}>
                      2026.07.27 ~ 2026.12.10
                    </span>
                  </div>
                </div>

                <div className={styles.bannerCard}>
                  <div className={styles.bannerThumb}>🧳</div>
                  <div className={styles.bannerInfo}>
                    <strong className={styles.bannerTitle}>
                      더현대트래블 여행 할인쿠폰 증정 이벤트
                    </strong>
                    <span className={styles.bannerDate}>
                      2026.06.05 ~ 2026.12.31
                    </span>
                  </div>
                </div>

                <div className={styles.bannerCard}>
                  <div className={styles.bannerThumb}>🏎️</div>
                  <div className={styles.bannerInfo}>
                    <strong className={styles.bannerTitle}>
                      N 택시 인제스피디움 차량 구매 혜택
                    </strong>
                    <span className={styles.bannerDate}>
                      2026.05.06 ~ 2026.12.30
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* 배경 어둡게 오버레이 (드롭다운 또는 검색창 열렸을 때) */}
      {(activeMenu || isSearchOpen) && (
        <div className={styles.backdrop} onClick={handleCloseAll} />
      )}
    </>
  );
}
