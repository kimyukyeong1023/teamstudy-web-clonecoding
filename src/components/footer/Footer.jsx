import { useEffect, useState } from 'react'
import styles from './Footer.module.css'

const VISIBLE_COUNT = 7
const quickMenuItems = [
  { id: 1, slug: 'estimate', label: '견적내기', icon: '/FooterImg/ico_estimation.avif', eyebrow: '내 차 만들기(견적)', title: '내 차를 직접 구성해 보세요', description: '차량과 트림, 색상 및 선택 품목을 구성하고 예상 구매 가격을 확인할 수 있습니다.', action: '내 차 만들기', fields: ['차량 선택', '트림·색상 선택', '선택 품목·견적 확인'] },
  { id: 2, slug: 'consult', label: '구매상담', icon: '/FooterImg/ico_purchase_consult.avif', eyebrow: '구매상담 신청', title: '차량 구매 정보를 신속하고 정확하게', description: '구매상담을 신청하면 선택한 지점 또는 대리점의 카마스터가 고객님께 연락드립니다.', action: '구매상담 신청', fields: ['차량 선택', '구매상담 희망지역', '구매 희망 정보'] },
  { id: 3, slug: 'drive', label: '시승신청', icon: '/FooterImg/ico_test_driving.avif', eyebrow: '시승신청', title: '현대자동차를 직접 경험해 보세요', description: '전국 드라이빙라운지에서 세단, SUV, EV 전 라인업을 카마스터 동승 또는 단독으로 시승할 수 있습니다.', action: '시승 신청', fields: ['시승 차량 선택', '드라이빙라운지 선택', '시승 일정 선택'] },
  { id: 4, slug: 'location', label: '판매처 검색', icon: '/FooterImg/ico_customer_branch.avif', eyebrow: '승용 판매/시승 네트워크', title: '원하는 지역의 판매처를 찾아보세요', description: '지점과 대리점은 물론 전시차량, 카마스터, 출고센터와 드라이빙라운지 정보도 확인할 수 있습니다.', action: '판매 네트워크 검색', fields: ['지점·대리점', '전시차량·카마스터', '출고센터·드라이빙라운지'] },
  { id: 5, slug: 'benefit', label: '구매혜택', icon: '/FooterImg/ico_monthly_benefit.avif', eyebrow: '이달의 구매혜택', title: '현대자동차의 다양한 구매혜택', description: '차종별 기본 구매혜택과 재고차, 전시차 등 상세 조건을 확인하고 나에게 맞는 혜택을 찾아보세요.', action: '이달의 혜택 보기', fields: ['차종별 구매혜택', '금융 프로그램', '프로모션·이벤트'] },
  { id: 6, slug: 'repair', label: '정비예약', icon: '/FooterImg/ico_service_reservation.png', eyebrow: '서비스 네트워크 검색/예약', title: '원하는 장소와 시간에 차량관리', description: '가까운 서비스센터 또는 블루핸즈를 검색하고 온라인으로 원하는 시간에 정비를 예약할 수 있습니다.', action: '서비스 네트워크 예약', fields: ['차종 선택', '정비내용·요청사항', '네트워크·날짜 선택'] },
  { id: 7, slug: 'catalog', label: '카탈로그·가격표', icon: '/FooterImg/ico_catalogprice.png', eyebrow: '카탈로그/가격표', title: '차량별 최신 자료를 확인하세요', description: '현대자동차 승용 및 상용 차종의 카탈로그와 최신 가격표를 내려받을 수 있습니다.', action: '카탈로그·가격표 보기', fields: ['승용 차종', '상용 차종', '카탈로그·가격표 다운로드'] },
  { id: 8, slug: 'bluemembers', label: '블루멤버스', icon: '/FooterImg/ico_bluemembers.png', eyebrow: 'BLUEmembers', title: '현대자동차 오너를 위한 고객 서비스', description: '2007년부터 이어진 블루멤버스의 차량관리, 포인트, 특화 프로그램 등 다양한 혜택을 만나보세요.', action: '블루멤버스 혜택 보기', fields: ['블루멤버스 차량관리', '블루멤버스 포인트', '특화 프로그램'] },
  { id: 9, slug: 'warranty', label: '보증수리안내', icon: '/FooterImg/ico_warranty.avif', eyebrow: '보증수리 안내', title: '차종별 보증기간을 확인하세요', description: '차량과 부품에 따른 보증기간, 보증수리의 범위와 고객이 알아두어야 할 사항을 안내합니다.', action: '보증수리 안내 보기', fields: ['차종별 보증기간', '부품별 보증 안내', '보증수리 유의사항'] },
]

export default function Footer() {
  const [startIndex, setStartIndex] = useState(0)
  const [activeService, setActiveService] = useState(null)
  const last = Math.max(0, quickMenuItems.length - VISIBLE_COUNT)

  useEffect(() => {
    const openFromHash = () => {
      const slug = window.location.hash.replace('#/', '')
      setActiveService(quickMenuItems.find((item) => item.slug === slug) ?? null)
    }
    openFromHash()
    window.addEventListener('hashchange', openFromHash)
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const openService = (service) => {
    window.location.hash = `/${service.slug}`
    setActiveService(service)
  }
  const closeService = () => {
    window.history.pushState(null, '', window.location.pathname)
    setActiveService(null)
  }

  return <><footer className={styles.footer}><nav className={styles.quickMenu} aria-label="주요 서비스 바로가기">
    <div className={styles.menuRow}>
      <button className={styles.arrow} onClick={() => setStartIndex(i => Math.max(0, i - 1))} disabled={startIndex === 0} aria-label="이전 메뉴">‹</button>
      <ul className={styles.list}>{quickMenuItems.slice(startIndex, startIndex + VISIBLE_COUNT).map(item => <li className={styles.item} key={item.id}><button className={styles.link} onClick={() => openService(item)} aria-describedby={`quick-menu-tooltip-${item.id}`}><span className={styles.icon}><img src={item.icon} alt="" /></span><span className={styles.label}>{item.label}</span><span className={styles.tooltip} id={`quick-menu-tooltip-${item.id}`} role="tooltip">{item.label} 이동</span></button></li>)}</ul>
      <button className={styles.arrow} onClick={() => setStartIndex(i => Math.min(last, i + 1))} disabled={startIndex === last} aria-label="다음 메뉴">›</button>
    </div>
    <input
      className={styles.scrollbar}
      type="range"
      min="0"
      max={last}
      step="1"
      value={startIndex}
      onChange={(event) => setStartIndex(Number(event.target.value))}
      aria-label="서비스 메뉴 가로 스크롤"
    />
  </nav></footer>{activeService && <ServiceBrowser service={activeService} onClose={closeService} />}</>
}

function ServiceBrowser({ service, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <section className={styles.browser} role="dialog" aria-modal="true" aria-labelledby="service-title">
        <header className={styles.chrome}>
          <div className={styles.controls} aria-hidden="true"><i /><i /><i /></div>
          <button className={styles.back} onClick={onClose} aria-label="서비스 메뉴로 돌아가기">←</button>
          <div className={styles.address}><span>●</span> hyundai-practice.local/service/{service.slug}</div>
          <button className={styles.close} onClick={onClose} aria-label="창 닫기">×</button>
        </header>
        <div className={styles.page}>
          <nav className={styles.siteNav} aria-label="현대자동차 사이트 메뉴">
            <strong className={styles.brand}><i aria-hidden="true">H</i> HYUNDAI</strong>
            <div className={styles.navLinks}><span>모델</span><span className={styles.currentNav}>구매/이벤트</span><span>서비스/멤버십</span><span>디지털/고객지원</span><span>브랜드</span><span>Shop</span></div>
            <div className={styles.utilities}><span>KR⌄</span><b aria-hidden="true">♙</b><b aria-hidden="true">⌕</b><b aria-hidden="true">☰</b></div>
          </nav>
          <div className={styles.breadcrumb}>홈 <b>›</b> 구매/이벤트 <b>›</b> 구매 <b>›</b> <strong>{service.eyebrow}</strong></div>
          <div className={styles.hero}>
            <div className={styles.copy}>
              <p>{service.eyebrow}</p>
              <h2 id="service-title">{service.title}</h2>
              <span>{service.description}</span>
            </div>
          </div>
          <div className={styles.categoryBar}><strong>{service.label}</strong>{service.fields.map((field, index) => <button className={index === 0 ? styles.activeCategory : ''} key={field}>{field}</button>)}<button className={styles.compare}>○ 전체 보기</button></div>
          <div className={styles.options}>{service.fields.map((field, index) => <button key={field}><small>STEP 0{index + 1}</small><img src={service.icon} alt="" /><strong>{field}</strong><span>자세히 보기&nbsp; →</span></button>)}</div>
        </div>
      </section>
    </div>
  )
}
