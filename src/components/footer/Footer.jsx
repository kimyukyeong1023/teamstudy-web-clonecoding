import { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import { VISIBLE_COUNT, quickMenuItems } from './quickMenuData'
import ServiceBrowser from './ServiceBrowser'

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

  return <>
  <footer className={styles.footer}>
    <nav className={styles.quickMenu} aria-label="주요   서비스 바로가기">
    <div className={styles.menuRow}>
      <button className={styles.arrow} onClick={() => setStartIndex(i => Math.max(0, i - 1))} 
              disabled={startIndex === 0} aria-label="이전 메뉴">‹</button>
      
      <ul className={styles.list}>{quickMenuItems.slice(
                     startIndex, startIndex + VISIBLE_COUNT).map(item => 
        <li className={styles.item} key={item.id}>
      <button className={styles.link} onClick={() => openService(item)} 
              aria-describedby={`quick-menu-tooltip-${item.id}`}>
        <span className={styles.icon}><img src={item.icon} alt="" /></span>
        <span className={styles.label}>{item.label}</span>
        <span className={styles.tooltip} id={`quick-menu-tooltip-${item.id}`} 
                         role="tooltip">{item.label} 이동</span>
      </button>
        </li>)}
      </ul>

      <button className={styles.arrow} onClick={() => setStartIndex(i => Math.min(last, i + 1))} 
              disabled={startIndex === last} aria-label="다음 메뉴">›</button>
    </div>
    <input
      className={styles.scrollbar}
      type="range"
      min="0"
      max={last}
      step="1"
      value={startIndex}
      onChange={(event) => setStartIndex(Number(event.target.value))}
      aria-label="서비스 메뉴 가로 스크롤"/>
  </nav>
  </footer>{activeService && <ServiceBrowser service={activeService} onClose={closeService} />}
  </>
}
