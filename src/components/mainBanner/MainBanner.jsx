import React, { useEffect, useState } from 'react'
import styles from './MainBanner.module.css';


export default function MainBanner() {
const bannerImages = [
    {
        id: "nexo",
        name: "NEXO",
        description: "당신만이 할 수 있는 일",
        image: "https://www.hyundai.com/contents/mainbanner/Main-KV_Car_The all-new NEXO.png"
    },
    {
        id: "grandeur",
        name: "The new GRANDEUR",
        description: "DONE. YET. GRANDEUR.",
        image: "https://www.hyundai.com/contents/mainbanner/main_kv_the_new_grandeur.png"
    },
    {
        id: "kona-electric",
        name: "KONA Electric",
        description: "새로운 차원의 라이프",
        image: "https://www.hyundai.com/contents/mainbanner/kona_electric_black_exterior_main_kv.png"
    },
    {
        id: "ioniq-5",
        name: "IONIQ 5",
        description: "내가 선택한 단 하나의 전기차",
        image: "https://www.hyundai.com/contents/mainbanner/ioniq5_main_kv_w.png"
    }
];
 
  let [imgIdx,setImgIdx]= useState(0);
  let curBanner=bannerImages[imgIdx];
  let [isMoving,setIsMoving]=useState(true);
  let [isHovered,setIsHovered] =useState(false);

  let [show,setShow]= useState(false);

  function nextBanner(){
    setShow(false);

    setImgIdx((imgIdx)=>{
      
      return (imgIdx+1)%bannerImages.length;
    });
      // 바깥 위치가 화면에 적용된 다음 안으로 이동
    setTimeout(() => {
        setShow(true);
    }, 50);

  }


  useEffect(()=>{
    if(!isMoving|| isHovered){
       return;

    }else {
          let intervalId =setInterval(nextBanner,4000);
      // 바깥 위치가 화면에 적용된 다음 안으로 이동
    setTimeout(() => {
        setShow(true);
    }, 50);
    
    return ()=>{clearInterval(intervalId)};
     
    }
  },[isMoving,isHovered])

  function indMinus(){
    
      setImgIdx((imgIdx)=>{
         if (imgIdx === 0) {
          return bannerImages.length - 1;
        }
        return --imgIdx;
      });
  }
    function indPlus(){
    
      setImgIdx((imgIdx)=>{
         if (imgIdx ===(bannerImages.length-1) ) {
          return 0;
        }
        return ++imgIdx;
      });
  }
  function preName(){
    let preIdx= imgIdx;
    if (imgIdx === 0) {
          preIdx= bannerImages.length - 1;
    }else{
          preIdx=imgIdx-1;
    }
  
    
    return bannerImages[preIdx].name;

  };
    function nextName(){
      let nextIdx= imgIdx;
    if (imgIdx === (bannerImages.length - 1)) {
          nextIdx= 0;
    }else{
          nextIdx=imgIdx+1;
    }
  
    return bannerImages[nextIdx].name;
    
  };

  


  return (
    <div className={styles.mianWrap}
        onMouseEnter={()=>setIsHovered(true)}
        onMouseLeave={()=>setIsHovered(false)}
    >
      <div className={styles.titleWrap}>
        <div className={`${styles.titleBox}  ${show ? styles.showT : ""}`}
              key={imgIdx}
>

            <h3><span className={styles.textContent}>{curBanner.name}</span></h3>
            <p><span className={styles.textContent}>{curBanner.description}</span></p>
  

        </div>
      </div>
      <div className={styles.bannerWrap}> 
        <img className={`${styles.bannerImg} ${show ? styles.show : ""}`}
             key={imgIdx}
              src={curBanner.image} alt="차이미지" 
              />
          
        <div className={styles.bannermove}>    
          <div className={styles.bannermoveD}>
            <button className={`${styles.bannerMoveBtn} ${styles.bannerBBtn}`}
                onClick={indMinus}
            ></button>
            <span className={styles.BannerBNName}>
              {preName()}
            </span>
          </div> 
          <div className={styles.bannermoveD}>
            <span className={styles.BannerBNName}>
              {nextName()}
            </span>
            <button className={`${styles.bannerMoveBtn} ${styles.bannerNBtn}`}
                  onClick={indPlus}></button>
          </div>
        </div> 
      </div>
      <div className={styles.listbar}>
        <ul className={styles.listBnt}>
          <li><button
          onClick={()=>setImgIdx(0)}
          ></button></li>
          <li><button
          onClick={()=>setImgIdx(1)}>
            </button></li>
          <li><button
          onClick={()=>setImgIdx(2)}>
            </button></li>
          <li><button
          onClick={()=>setImgIdx(3)}>
            </button></li>
        </ul>
        <button className={`${styles.playBtn} 
                          ${isMoving ? styles.pause : styles.play}`}
                onClick={()=>{setIsMoving(!isMoving)}}
        ></button>
      </div>

    </div>
  )
}

