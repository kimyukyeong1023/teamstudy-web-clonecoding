import React, { useEffect, useState } from "react";
import styles from "./MainBanner.module.css";
import { Link } from "react-router-dom";
import { cars } from "./cars";

export default function MainBanner() {
  let [imgIdx, setImgIdx] = useState(0);
  let curBanner = cars[imgIdx];
  let [isMoving, setIsMoving] = useState(true);
  let [isHovered, setIsHovered] = useState(false);

  let [show, setShow] = useState(false);

  function nextBanner() {
    setShow(false);

    setImgIdx((imgIdx) => {
      return (imgIdx + 1) % cars.length;
    });
    // 바깥 위치가 화면에 적용된 다음 안으로 이동
    setTimeout(() => {
      setShow(true);
    }, 50);
  }

  useEffect(() => {
    if (!isMoving || isHovered) {
      return;
    } else {
      let intervalId = setInterval(nextBanner, 4000);
      // 바깥 위치가 화면에 적용된 다음 안으로 이동
      setTimeout(() => {
        setShow(true);
      }, 50);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isMoving, isHovered]);

  function indMinus() {
    setImgIdx((imgIdx) => {
      if (imgIdx === 0) {
        return cars.length - 1;
      }
      return --imgIdx;
    });
  }
  function indPlus() {
    setImgIdx((imgIdx) => {
      if (imgIdx === cars.length - 1) {
        return 0;
      }
      return ++imgIdx;
    });
  }
  function preName() {
    let preIdx = imgIdx;
    if (imgIdx === 0) {
      preIdx = cars.length - 1;
    } else {
      preIdx = imgIdx - 1;
    }

    return cars[preIdx].name;
  }
  function nextName() {
    let nextIdx = imgIdx;
    if (imgIdx === cars.length - 1) {
      nextIdx = 0;
    } else {
      nextIdx = imgIdx + 1;
    }

    return cars[nextIdx].name;
  }

  return (
    <div className={styles.mianWrap}>
      <div className={styles.titleWrap}>
        <div
          className={`${styles.titleBox}  ${show ? styles.showT : ""}`}
          key={imgIdx}
        >
          <Link
            key={imgIdx}
            to={`/cars/${curBanner.id}`}
            className={styles.textLinkGroup}
          >
            <h3>{curBanner.name}</h3>
            <p>{curBanner.description}</p>
          </Link>
        </div>
      </div>
      <div
        className={styles.bannerWrap}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link key={imgIdx} to={`/cars/${curBanner.id}`}>
          <img
            className={`${styles.bannerImg} ${show ? styles.show : ""}`}
            key={imgIdx}
            src={curBanner.image}
            alt="차이미지"
          />
        </Link>

        <div className={styles.bannermove}>
          <span className={styles.bannermoveD}>
            <button
              className={`${styles.bannerMoveBtn} ${styles.bannerBBtn}`}
              onClick={indMinus}
            ></button>
            <span className={styles.BannerBNName}>{preName()}</span>
          </span>

          <span className={styles.bannermoveD}>
            <span className={styles.BannerBNName}>{nextName()}</span>
            <button
              className={`${styles.bannerMoveBtn} ${styles.bannerNBtn}`}
              onClick={indPlus}
            ></button>
          </span>
        </div>
      </div>
      <div className={styles.listbar}>
        <ul className={styles.listBnt}>
          <li>
            <button onClick={() => setImgIdx(0)}></button>
          </li>
          <li>
            <button onClick={() => setImgIdx(1)}></button>
          </li>
          <li>
            <button onClick={() => setImgIdx(2)}></button>
          </li>
          <li>
            <button onClick={() => setImgIdx(3)}></button>
          </li>
        </ul>
        <button
          className={`${styles.playBtn} 
                          ${isMoving ? styles.pause : styles.play}`}
          onClick={() => {
            setIsMoving(!isMoving);
          }}
        ></button>
      </div>
    </div>
  );
}
