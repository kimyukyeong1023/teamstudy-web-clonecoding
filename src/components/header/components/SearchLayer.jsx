import React from "react";
import styles from "../Header.module.css";

/**
 * [통합 검색 레이어 컴포넌트]
 * 상단 검색어 입력창과 하단 최근 검색어 / 실시간 인기 검색어 Top 10 목록을 렌더링합니다[cite: 1].
 */
export default function SearchLayer({
  searchQuery,
  setSearchQuery,
  setIsSearchOpen,
  popularKeywords,
}) {
  return (
    <div className={styles.searchLayer}>
      {/* 상단 검색어 입력 및 삭제/검색 실행 구역[cite: 1] */}
      <div className={styles.searchBarContainer}>
        <div className={styles.searchInputBox}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="검색어를 입력해주세요."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* 입력 문자가 있을 때만 나타나는 내용 전체 지우기(✕) 버튼[cite: 1] */}
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
          {/* 검색 실행 돋보기 버튼[cite: 1] */}
          <button type="button" className={styles.searchIconBtn} aria-label="검색 실행">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1c1c1c" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* 검색 레이어 닫기(✕) 버튼[cite: 1] */}
        <button
          type="button"
          className={styles.searchCloseBtn}
          onClick={() => setIsSearchOpen(false)}
          aria-label="닫기"
        >
          ✕
        </button>
      </div>

      {/* 하단 검색 관련 콘텐츠 구역 (최근 검색어 + 인기 검색어)[cite: 1] */}
      <div className={styles.searchContentContainer}>
        <div className={styles.searchContentBox}>
          {/* 좌측: 최근 검색어 영역[cite: 1] */}
          <div className={styles.recentSearchSection}>
            <div className={styles.searchSectionHeader}>
              <span className={styles.searchSectionTitle}>최근 검색어</span>
              <button type="button" className={styles.clearHistoryBtn}>검색기록 삭제</button>
            </div>
          </div>

          {/* 우측: 실시간 인기 검색어 Top 10 목록[cite: 1] */}
          <div className={styles.popularSearchSection}>
            <div className={styles.searchSectionHeader}>
              <span className={styles.searchSectionTitle}>인기 검색어 Top10</span>
            </div>
            <ul className={styles.popularList}>
              {popularKeywords.map((item, idx) => (
                <li key={idx} className={styles.popularItem}>
                  <a href="#none" className={styles.popularLink}>{item}</a>
                </li>
              ))}
            </ul>
            <div className={styles.autoCompleteFooter}>
              <button type="button" className={styles.autoCompleteBtn}>자동 완성 끄기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}