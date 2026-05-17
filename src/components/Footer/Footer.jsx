// src/components/Footer/Footer.jsx
import React from 'react'
import config from '../../data/config'
import styles from './Footer.module.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.logo}>
          <span className={styles.logoMf}>MF</span>
          <span className={styles.logoCompany}>COMPANY</span>
        </div>

        <p className={styles.copy}>
          © {year} MF Company. Todos os direitos reservados.
        </p>

        <a
          href={config.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ig}
        >
          @{config.instagramHandle}
        </a>
      </div>
    </footer>
  )
}
