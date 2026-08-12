import React from "react";
import styles from "../Header.module.css";

/**
 * [우측 유틸리티 네비게이션 컴포넌트]
 * 랜덤 프로모션 텍스트, 언어 선택 드롭다운, 로그인 드롭다운, 검색 토글, 전체메뉴 버튼을 렌더링합니다[cite: 1].
 */
export default function UtillNav({ utillMenu, handleSearchToggle }) {
  return (
    <div className={styles.utillArea}>
      {/* 새로고침 시 무작위(랜덤)로 변경되는 우측 이벤트 텍스트 링크[cite: 1] */}
      <a href={utillMenu.url} className={styles.evLink}>
        {utillMenu.before}
        <b>{utillMenu.bold}</b>
        {utillMenu.after}
      </a>

      {/* 다국어 선택 드롭다운 영역[cite: 1] */}
      <div className={styles.langWrapper}>
        <button type="button" className={styles.langBtn}>
          KR <span className={styles.arrowIcon}>▾</span>
        </button>
        <div className={styles.langDropdown}>
          <ul className={styles.dropdownList}>
            <li><a href="#none" className={styles.langLink}>EN</a></li>
            <li><a href="#none" className={styles.langLink}>CN</a></li>
            <li><a href="#none" className={styles.langLink}>월드와이드</a></li>
            <li><a href="#none" className={styles.langLink}>상용글로벌</a></li>
          </ul>
        </div>
      </div>

      {/* 메뉴 구분 세로선[cite: 1] */}
      <span className={styles.divider}></span>

      {/* 로그인 유형 선택 드롭다운 영역[cite: 1] */}
      <div className={styles.loginWrapper}>
        <button type="button" className={styles.iconBtn} aria-label="로그인">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="4" />
            <path d="M4 20c0-4.418 3.582-8 8-8s8 3.582 8 8" />
          </svg>
        </button>
        <div className={styles.loginDropdown}>
          <ul className={styles.dropdownList}>
            <li><a href="#none" className={styles.loginLink}>개인 로그인{"\u00A0\u00A0\u00A0"}&gt;</a></li>
            <li><a href="#none" className={styles.loginLink}>법인 로그인{"\u00A0\u00A0\u00A0"}&gt;</a></li>
          </ul>
        </div>
      </div>

      {/* 통합 검색 패널 열기/닫기 토글 버튼[cite: 1] */}
      <button type="button" className={styles.iconBtn} aria-label="검색" onClick={handleSearchToggle}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {/* 현대자동차 전체 메뉴 페이지 외부 이동 버튼[cite: 1] */}
      <button
        type="button"
        className={styles.iconBtn}
        aria-label="전체메뉴"
        onClick={() => { window.location.href = "https://www.hyundai.com/kr/ko/e/menu-list"; }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="7" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>
    </div>
  );
}