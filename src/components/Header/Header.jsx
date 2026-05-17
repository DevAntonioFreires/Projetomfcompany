// src/components/Header/Header.jsx
import React, { useState } from 'react'
import useScrolled from '../../hooks/useScrolled'
import config from '../../data/config'
import styles from './Header.module.css'

export default function Header() {
  const scrolled = useScrolled(60)
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          <a href="#" className={styles.logo}>
            <span className={styles.logoMf}>MF</span>
            <span className={styles.logoCompany}>COMPANY</span>
          </a>

          <nav className={styles.nav}>
            <a href="#collection" className={styles.navLink}>Coleção</a>
            <a href="#frete"      className={styles.navLink}>Frete</a>
            <a href="#about"      className={styles.navLink}>Sobre</a>
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.navLink} ${styles.navIg}`}
            >
              <IgIcon />
              @{config.instagramHandle}
            </a>
          </nav>

          <button
            className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <div className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ''}`}>
        <a href="#collection" className={styles.mobileLink} onClick={closeMenu}>Coleção</a>
        <a href="#frete"      className={styles.mobileLink} onClick={closeMenu}>Frete</a>
        <a href="#about"      className={styles.mobileLink} onClick={closeMenu}>Sobre</a>
        <a
          href={config.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.mobileLink}
          onClick={closeMenu}
        >
          Instagram
        </a>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div className={styles.overlay} onClick={closeMenu} />
      )}
    </>
  )
}

function IgIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
