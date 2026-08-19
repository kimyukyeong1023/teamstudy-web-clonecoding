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
  //애니메이션 초기상태로 변환하면서 cars의 인덱스 증가
  function nextBanner() {
    setShow(false);

    setImgIdx((imgIdx) => {
      return (imgIdx + 1) % cars.length;
    });
  }

  function preBanner() {
    setShow(false);

    setImgIdx((imgIdx) => {
      return (imgIdx - 1 + cars.length) % cars.length;
    });
  }
  // cars의 인덱스가 변하면 애니메이션 실행을 위한 상태 변화.
  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setShow(true);
    }, 50);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [imgIdx]);
  //자동재생일때, 4초마다의 자동 재생. 그리고 재생버튼과 호버의 변화로 인한 자동재생 상태를 변화시킴
  useEffect(() => {
    if (!isMoving || isHovered) {
      return;
    } else {
      let intervalId = setInterval(nextBanner, 4000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isMoving, isHovered]);

  //리팩토링으로 인해 제거된 함수
  // function indMinus() {
  //   setImgIdx((imgIdx) => {
  //     if (imgIdx === 0) {
  //       return cars.length - 1;
  //     }
  //     return --imgIdx;
  //   });
  // }
  // function indPlus() {
  //   setImgIdx((imgIdx) => {
  //     if (imgIdx === cars.length - 1) {
  //       return 0;
  //     }
  //     return ++imgIdx;
  //   });
  // }

  //현재 cars의 이전과 다음 이름을 화면에 보여주기 위한 함수.
  function preName() {
    let preIdx = (imgIdx - 1 + cars.length) % cars.length;
    // if (imgIdx === 0) {
    //   preIdx = cars.length - 1;
    // } else {
    //   preIdx = imgIdx - 1;
    // }

    return cars[preIdx].name;
  }
  function nextName() {
    let nextIdx = (imgIdx + 1) % cars.length;
    // if (imgIdx === cars.length - 1) {
    //   nextIdx = 0;
    // } else {
    //   nextIdx = imgIdx + 1;
    // }

    return cars[nextIdx].name;
  }

  return (
    <div className={styles.mainWrap}>
      <div className={styles.titleWrap}>
        {/* show의 상태로 애니메이션을 발생시키는 클래스를 결정*/}
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
      {/* 마우스가 위로 올라오면 isHovered 상태를 변경하여 인덱스 이동을 멈춤 */}
      <div
        className={styles.bannerWrap}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link  key={imgIdx} to={`/cars/${curBanner.id}`}>
          {/*show의 상태로 애니메이션을 발생시키는 클래스를 결정  */}
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
              onClick={preBanner}
            ></button>
            <span className={styles.BannerBNName}>{preName()}</span>
          </span>

          <span className={styles.bannermoveD}>
            <span className={styles.BannerBNName}>{nextName()}</span>
            <button
              className={`${styles.bannerMoveBtn} ${styles.bannerNBtn}`}
              onClick={nextBanner}
            ></button>
          </span>
        </div>
      </div>

      <div className={styles.listbar}>
        <ul className={styles.listBnt}>
          {/* 의도적으로 애니메이션을 주지 않고 바로 다음 데이터들이 나타나게함. */}
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
        {/* isMoving의 상태로 재생 버튼의 모양클래스 결정  */}
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
