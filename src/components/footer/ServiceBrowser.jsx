import { useEffect } from 'react'
import styles from './ServiceBrowser.module.css'

export default function ServiceBrowser({ service, onClose }) {
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
            <div className={styles.navLinks}><span>모델</span>
            <span className={styles.currentNav}>구매/이벤트</span>
            <span>서비스/멤버십</span><span>디지털/고객지원</span>
            <span>브랜드</span><span>Shop</span></div>
            
            <div className={styles.utilities}><span>KR⌄</span><b aria-hidden="true">♙</b>
            <b aria-hidden="true">⌕</b><b aria-hidden="true">☰</b></div>
          </nav>
          
          <div className={styles.breadcrumb}>홈 
            <b>›</b> 구매/이벤트 <b>›</b> 구매 <b>›</b> 
             <strong>{service.eyebrow}</strong></div>
          
          <div className={styles.hero}>
            <div className={styles.copy}>
              <p>{service.eyebrow}</p>
              <h2 id="service-title">{service.title}</h2>
              <span>{service.description}</span>
            </div>
          </div>
          
          <div className={styles.categoryBar}>
            <strong>{service.label}</strong>{service.fields.map((field, index) => 
            <button className={index === 0 ? styles.activeCategory : ''} key={field}>{field}</button>)}
            <button className={styles.compare}>○ 전체 보기</button></div>
          
          <div className={styles.options}>{service.fields.map((field, index) => 
            <button key={field}><small>STEP 0{index + 1}</small><img src={service.icon} alt="" />
            <strong>{field}</strong><span>자세히 보기&nbsp; →</span></button>)}</div>
        </div>
      </section>
    </div>
  )
}

