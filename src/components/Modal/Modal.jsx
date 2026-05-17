// src/components/Modal/Modal.jsx
import React, { useState, useEffect } from 'react'
import config from '../../data/config'
import styles from './Modal.module.css'

export default function Modal({ product, onClose }) {
  const [current, setCurrent] = useState(0)
  const imgs = product.images

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const prev = () => setCurrent(i => i === 0 ? imgs.length - 1 : i - 1)
  const next = () => setCurrent(i => i === imgs.length - 1 ? 0 : i + 1)

  const instagramUrl = config.instagramUrl

  return (
    <div
      className={styles.backdrop}
      onClick={e => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
          <CloseIcon />
        </button>

        {/* ── Image panel with carousel ── */}
        <div className={styles.imgPanel}>
          {/* Slides */}
          <div className={styles.slides}>
            {imgs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} — ${i + 1}`}
                className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
              />
            ))}
          </div>

          {/* Arrows */}
          {imgs.length > 1 && (
            <>
              <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Anterior">
                <ChevronLeft />
              </button>
              <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Próxima">
                <ChevronRight />
              </button>
            </>
          )}

          {/* Thumbnails strip */}
          {imgs.length > 1 && (
            <div className={styles.thumbs}>
              {imgs.map((src, i) => (
                <button
                  key={i}
                  className={`${styles.thumb} ${i === current ? styles.thumbActive : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Foto ${i + 1}`}
                >
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Details ── */}
        <div className={styles.details}>
          <span className={styles.colorTag}>{product.color}</span>
          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.price}>{product.price}</p>
          <p className={styles.desc}>{product.description}</p>

          {/* Photo counter */}
          {imgs.length > 1 && (
            <p className={styles.photoCount}>
              {current + 1} / {imgs.length} fotos
            </p>
          )}

          <a
            href={instagramUrl}
            className={styles.whatsappBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          Comprar pelo Instagram
          </a>
        </div>
      </div>
    </div>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}
