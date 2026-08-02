import React from 'react'
import styles from './MainBanner.module.css';


export default function MainBanner() {
  return (
    <div className={styles.mianWrap}>
      <div className={styles.titleBox}>
        <h3>차이름</h3>
        <p>차설명</p>

      </div>
      <div className={styles.bannerWrap}>
        <button className={`${styles.bannerMoveBtn} ${styles.bannerBBtn}`}></button>
        <span className={styles.BannerBNName}>이전차이름</span>
        <img className={styles.bannerImg}
              src="./mainBannerimg/Mainnew NEXO.avif" alt="차이미지" />
        <span className={styles.BannerBNName}>다음차이름</span>
        <button className={`${styles.bannerMoveBtn} ${styles.bannerNBtn}`}></button>
      </div>
      <div className={styles.listbar}>
        <ul className={styles.listBnt}>
          <li><button></button></li>
          <li><button></button></li>
          <li><button></button></li>
          <li><button></button></li>
        </ul>
        <button className={styles.playBtn}></button>
      </div>
      <div >
        <p>※ 본 웹사이트는 상업적 목적이 아닌 개인 프론트엔드 학습용으로 제작된 클론 코딩 사이트입니다.</p>
        <p>사이트 내 사용된 모든 이미지와 로고의 저작권 및 지적재산권은 <strong>현대자동차</strong>에 있으며, 문제 발생 시 즉각 삭제 조치하겠습니다.</p>
      </div>
    </div>
  )
}

