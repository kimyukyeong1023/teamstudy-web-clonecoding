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
    </div>
  )
}

