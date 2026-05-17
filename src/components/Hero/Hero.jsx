// src/components/Hero/Hero.jsx
import React from 'react'
import config from '../../data/config'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <img
          src="/img/home-banner.png"
          alt="Brasil Collection 2026"
          className={styles.bgImg}
        />
        <div className={styles.bgOverlay} />
        <div className={styles.grain} />
      </div>

      <div className={styles.content}>
        <span className={styles.badge}>Nova Coleção</span>

        <h1 className={styles.title}>
          <span className={styles.titleLine}>BRASIL</span>
          <span className={`${styles.titleLine} ${styles.titleAccent}`}>2026</span>
        </h1>

        <p className={styles.sub}>{config.storeTagline}</p>

        <a href="#collection" className={styles.btn}>
          Ver Coleção
          <ArrowIcon />
        </a>
      </div>

      <div className={styles.scroll}>
        <span>Scroll</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}
