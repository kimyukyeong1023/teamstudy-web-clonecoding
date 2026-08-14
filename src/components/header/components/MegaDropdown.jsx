import React from "react";
import styles from "../Header.module.css";

/**
 * [대형 메가 드롭다운 패널 컴포넌트]
 * 선택된 상단 카테고리의 5열 그리드 메뉴 항목들과 하단 프로모션 이벤트 카드 배너를 출력합니다[cite: 1].
 */
export default function MegaDropdown({ activeMenu, setActiveMenu, megaMenus }) {
  return (
    <div className={styles.megaDropdown}>
      {/* 드롭다운 우측 상단 닫기(✕) 버튼[cite: 1] */}
      <button
        type="button"
        className={styles.megaCloseBtn}
        onClick={() => setActiveMenu(null)}
        aria-label="닫기"
      >
        ✕
      </button>

      <div className={styles.megaInner}>
        {/* 카테고리 제목 및 5열 세부 항목 그리드 구역[cite: 1] */}
        <div className={styles.megaGrid}>
          {megaMenus[activeMenu].categories.map((cat, idx) => (
            <div key={idx} className={styles.megaRow}>
              {/* 카테고리 대제목[cite: 1] */}
              <div className={styles.categoryTitle}>{cat.title}</div>
              {/* 세부 항목 리스트[cite: 1] */}
              <div className={styles.categoryItems}>
                {cat.items.map((item, itemIdx) => (
                  <a key={itemIdx} href="#none" className={styles.megaLink}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 하단 프로모션 이벤트 배너 카드 3종 영역[cite: 1] */}
        <div className={styles.megaBannerArea}>
          <div className={styles.bannerCard}>
            <div className={styles.bannerThumb}>📱</div>
            <div className={styles.bannerInfo}>
              <strong className={styles.bannerTitle}>현대 제네시스 셀렉션 친구초대 이벤트</strong>
              <span className={styles.bannerDate}>2026.07.27 ~ 2026.12.10</span>
            </div>
          </div>
          <div className={styles.bannerCard}>
            <div className={styles.bannerThumb}>🧳</div>
            <div className={styles.bannerInfo}>
              <strong className={styles.bannerTitle}>더현대트래블 여행 할인쿠폰 증정 이벤트</strong>
              <span className={styles.bannerDate}>2026.06.05 ~ 2026.12.31</span>
            </div>
          </div>
          <div className={styles.bannerCard}>
            <div className={styles.bannerThumb}>🏎️</div>
            <div className={styles.bannerInfo}>
              <strong className={styles.bannerTitle}>N 택시 인제스피디움 차량 구매 혜택</strong>
              <span className={styles.bannerDate}>2026.05.06 ~ 2026.12.30</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}