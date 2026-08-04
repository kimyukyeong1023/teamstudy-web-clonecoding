import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";

// 1. 새로고침 시 무작위로 노출할 메뉴 후보 데이터 정의
const DYNAMIC_NAV_OPTIONS = ["Shop", "현대인증중고차", "Bluelink Store"];
const DYNAMIC_UTILL_OPTIONS = [
  { before: "Hi, ", bold: "EV", after: "" },
  { before: "사양백과", bold: "", after: "" },
  { before: "", bold: "Trendy ", after: "Hyundai" },
  { before: "", bold: "내 차 ", after: "추천받기" },
];

export default function Header() {
  // 2. 기존 상태(State)
  const [navMenu, setNavMenu] = useState(DYNAMIC_NAV_OPTIONS[0]);
  const [utillMenu, setUtillMenu] = useState(DYNAMIC_UTILL_OPTIONS[0]);

  // 스크롤 관련 상태(State)
  const [scrollProgress, setScrollProgress] = useState(0); // 진행바 너비 (%)
  const [isScrolled, setIsScrolled] = useState(false);     // 스크롤 여부 판단

  // 3. 랜더링/스크롤 이벤트 처리
  useEffect(() => {
    // 무작위 메뉴 선택 (기존 로직)
    const randomNav =
      DYNAMIC_NAV_OPTIONS[
        Math.floor(Math.random() * DYNAMIC_NAV_OPTIONS.length)
      ];
    const randomUtill =
      DYNAMIC_UTILL_OPTIONS[
        Math.floor(Math.random() * DYNAMIC_UTILL_OPTIONS.length)
      ];

    setNavMenu(randomNav);
    setUtillMenu(randomUtill);

    // 스크롤 감지 함수
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }

      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >
      {/* 최상단 스크롤 진행바 (Progress Bar) */}
      <div
        className={styles.progressBar}
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 중앙 정렬 및 가로 최대 폭 제한 상자 */}
      <div className={styles.headerInner}>
        {/* 1. [좌측 그룹] 로고 + 메인 네비게이션 */}
        <div className={styles.leftBox}>
          <div className={styles.logoArea}>
            <h1 className={styles.logoHeading}>
              <button type="button" className={styles.logoBtn}>
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
                <a href="#none" className={styles.navLink}>
                  모델
                </a>
              </li>
              <li>
                <button type="button" className={styles.navBtn}>
                  구매/이벤트
                </button>
              </li>
              <li>
                <button type="button" className={styles.navBtn}>
                  서비스/멤버십
                </button>
              </li>
              <li>
                <button type="button" className={styles.navBtn}>
                  디지털/고객지원
                </button>
              </li>
              <li>
                <button type="button" className={styles.navBtn}>
                  브랜드
                </button>
              </li>

              <li>
                <button type="button" className={styles.navBtn}>
                  {navMenu}
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* 2. [우측] 유틸리티 영역 */}
        <div className={styles.utillArea}>
          <a href="#none" className={styles.evLink}>
            {utillMenu.before}
            <b>{utillMenu.bold}</b>
            {utillMenu.after}
          </a>

          {/* KR 언어 드롭다운 래퍼 */}
          <div className={styles.langWrapper}>
            <button type="button" className={styles.langBtn}>
              KR <span className={styles.arrowIcon}>▾</span>
            </button>

            <div className={styles.langDropdown}>
              <ul className={styles.dropdownList}>
                <li><a href="#none">EN</a></li>
                <li><a href="#none">CN</a></li>
                <li><a href="#none">월드와이드</a></li>
                <li><a href="#none">상용글로벌</a></li>
              </ul>
            </div>
          </div>

          <span className={styles.divider}></span>

          {/* 로그인 아이콘 드롭다운 래퍼 */}
          <div className={styles.loginWrapper}>
            <button type="button" className={styles.iconBtn} aria-label="로그인">
              {/* 🛠️ [수정] 현대차 공식 실사이트 동일 정식 사람 모양 SVG 적용 */}
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
                <li><a href="#none">개인 로그인 &gt;</a></li>
                <li><a href="#none">법인 로그인 &gt;</a></li>
              </ul>
            </div>
          </div>

          <button type="button" className={styles.iconBtn} aria-label="검색">
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

          <button
            type="button"
            className={styles.iconBtn}
            aria-label="전체메뉴"
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
    </header>
  );
}