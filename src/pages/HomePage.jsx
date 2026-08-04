import React from 'react'
import MainBanner from '../components/mainBanner/MainBanner'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'

export default function HomePage() {
  return (
    <div className='BGImg'>
       <Header/>
       <MainBanner/>
       <Footer/>
        <div >
        <p>※ 본 웹사이트는 상업적 목적이 아닌 개인 프론트엔드 학습용으로 제작된 클론 코딩 사이트입니다.</p>
        <p>사이트 내 사용된 모든 이미지와 로고의 저작권 및 지적재산권은 <strong>현대자동차</strong>에 있으며, 문제 발생 시 즉각 삭제 조치하겠습니다.</p>
      </div>
    </div>
  )
}
