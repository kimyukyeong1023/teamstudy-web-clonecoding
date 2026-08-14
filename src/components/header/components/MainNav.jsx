import React from "react";
import styles from "../Header.module.css";

/**
 * [메인 네비게이션 GNB 컴포넌트]
 * 상단 주요 카테고리 메뉴 목록 및 클릭 시 움직이는 슬라이딩 하이라이트 바를 렌더링합니다[cite: 1].
 */
export default function MainNav({
  activeMenu,
  handleMenuClick,
  navMenu,
  navRefs,
  indicatorStyle,
}) {
  return (
    /* 메인 메뉴 탐색 가로 레이아웃[cite: 1] */
    <nav className={styles.mainNav}>
      <ul className={styles.navList}>
        {/* 고정 메뉴: 모델[cite: 1] */}
        <li>
          <a
            href="https://www.hyundai.com/kr/ko/e/all-vehicles"
            className={styles.navLink}
          >
            모델
          </a>
        </li>

        {/* 대형 드롭다운 메뉴 항목 배열 순회 렌더링[cite: 1] */}
        {["구매/이벤트", "서비스/멤버십", "디지털/고객지원", "브랜드"].map(
          (menuName) => (
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
          ),
        )}

        {/* 새로고침 시 무작위(랜덤)로 변경되는 동적 메뉴 항목[cite: 1] */}
        <li>
          <a href={navMenu.url} className={styles.navLink}>
            {navMenu.name}
          </a>
        </li>

        {/* 메뉴 이동 시 하단에 따라붙는 애니메이션 인디케이터 바[cite: 1] */}
        <span className={styles.navIndicator} style={indicatorStyle} />
      </ul>
    </nav>
  );
}