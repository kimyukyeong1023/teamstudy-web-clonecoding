import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";

// 분리한 조각 단위 자식 컴포넌트 불러오기
import HeaderLogo from "./components/HeaderLogo";
import MainNav from "./components/MainNav";
import UtillNav from "./components/UtillNav";
import MegaDropdown from "./components/MegaDropdown";
import SearchLayer from "./components/SearchLayer";

/* =========================================================
   1. 외부 설정 데이터 (GNB 메뉴 및 키워드 데이터 구조)
   ========================================================= */

// 페이지 새로고침 시 메인 네비게이션 끝에 랜덤으로 노출될 메뉴 목록[cite: 1]
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

// 페이지 새로고침 시 우측 유틸리티 영역에 랜덤으로 노출될 프로모션 텍스트[cite: 1]
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

// 검색 레이어 내 실시간 인기 검색어 Top 10 목록[cite: 1]
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

// 카테고리별 대형 드롭다운(Mega Dropdown) 메뉴 세부 데이터[cite: 1]
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

/**
 * [헤더 최상위 메인 컴포넌트]
 * 전체 상태 관리(State), 스크롤 감지 및 조각 컴포넌트들의 조립을 담당합니다[cite: 1].
 */
export default function Header() {
  // 동적 노출 메뉴 상태 (랜덤)[cite: 1]
  const [navMenu, setNavMenu] = useState(DYNAMIC_NAV_OPTIONS[0]);
  const [utillMenu, setUtillMenu] = useState(DYNAMIC_UTILL_OPTIONS[0]);

  // 페이지 스크롤 감지 및 진행률 퍼센트[cite: 1]
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // 활성화된 메가 드롭다운 메뉴 및 검색 레이어 상태[cite: 1]
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // 메뉴 하단 슬라이딩 하이라이트 바 스타일 및 DOM 참조[cite: 1]
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRefs = useRef({});

  // 마운트 시 랜덤 메뉴 설정 및 스크롤 진행률 계산 리스너 등록[cite: 1]
  useEffect(() => {
    setNavMenu(
      DYNAMIC_NAV_OPTIONS[
        Math.floor(Math.random() * DYNAMIC_NAV_OPTIONS.length)
      ]
    );
    setUtillMenu(
      DYNAMIC_UTILL_OPTIONS[
        Math.floor(Math.random() * DYNAMIC_UTILL_OPTIONS.length)
      ]
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

  // 활성화된 메뉴 위치 추적 -> 하단 인디케이터 바 위치 및 넓이 동적 계산[cite: 1]
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

  // 상단 네비게이션 메뉴 클릭 (드롭다운 토글)[cite: 1]
  const handleMenuClick = (menuName) => {
    setIsSearchOpen(false);
    setActiveMenu((prev) => (prev === menuName ? null : menuName));
  };

  // 우측 돋보기 아이콘 클릭 (검색 레이어 토글)[cite: 1]
  const handleSearchToggle = () => {
    setActiveMenu(null);
    setIsSearchOpen((prev) => !prev);
  };

  // 모달, 드롭다운, 검색창 등 모든 오버레이 닫기[cite: 1]
  const handleCloseAll = () => {
    setActiveMenu(null);
    setIsSearchOpen(false);
  };

  return (
    <>
      {/* 헤더 최상위 고정 레이아웃 컨테이너[cite: 1] */}
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ""} ${
          activeMenu || isSearchOpen ? styles.menuActive : ""
        }`}
      >
        {/* 상단 스크롤 위치 표시 프로그레스 바[cite: 1] */}
        {!activeMenu && !isSearchOpen && (
          <div
            className={styles.progressBar}
            style={{ width: `${scrollProgress}%` }}
          />
        )}

        {/* 헤더 가로 콘텐츠 감싸는 내부 정렬 영역[cite: 1] */}
        <div className={styles.headerInner}>
          <div className={styles.leftBox}>
            {/* 로고 영역 조각 컴포넌트 */}
            <HeaderLogo />
            {/* 메인 네비게이션 조각 컴포넌트 */}
            <MainNav
              activeMenu={activeMenu}
              handleMenuClick={handleMenuClick}
              navMenu={navMenu}
              navRefs={navRefs}
              indicatorStyle={indicatorStyle}
            />
          </div>

          {/* 우측 유틸리티 영역 조각 컴포넌트 */}
          <UtillNav
            utillMenu={utillMenu}
            handleSearchToggle={handleSearchToggle}
          />
        </div>

        {/* 조건부 렌더링: 통합 검색 레이어 패널[cite: 1] */}
        {isSearchOpen && (
          <SearchLayer
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setIsSearchOpen={setIsSearchOpen}
            popularKeywords={POPULAR_KEYWORDS}
          />
        )}

        {/* 조건부 렌더링: 대형 드롭다운 메뉴 (Mega Dropdown) 패널[cite: 1] */}
        {activeMenu && MEGA_MENUS[activeMenu] && (
          <MegaDropdown
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            megaMenus={MEGA_MENUS}
          />
        )}
      </header>

      {/* 메뉴 및 검색창 활성화 시 뒷배경 어둡게 차단하는 오버레이[cite: 1] */}
      {(activeMenu || isSearchOpen) && (
        <div className={styles.backdrop} onClick={handleCloseAll} />
      )}
    </>
  );
}