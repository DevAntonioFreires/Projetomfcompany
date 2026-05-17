// src/components/ProductCard/ProductCard.jsx
import React, { useState } from 'react'
import useIntersection from '../../hooks/useIntersection'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, index, onClick }) {
  const [ref, visible] = useIntersection()
  const [current, setCurrent] = useState(0)
  const imgs = product.images

  const prev = (e) => {
    e.stopPropagation()
    setCurrent(i => (i === 0 ? imgs.length - 1 : i - 1))
  }
  const next = (e) => {
    e.stopPropagation()
    setCurrent(i => (i === imgs.length - 1 ? 0 : i + 1))
  }
  const dot = (e, i) => {
    e.stopPropagation()
    setCurrent(i)
  }

  return (
    <article
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ''}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`Ver detalhes de ${product.name}`}
    >
      {/* ── Image carousel ── */}
      <div className={styles.imgWrap}>

        {/* Slides */}
        <div className={styles.slides}>
          {imgs.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${product.name} — foto ${i + 1}`}
              className={`${styles.slide} ${i === current ? styles.slideActive : ''}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        {/* Nav arrows — only if more than 1 image */}
        {imgs.length > 1 && (
          <>
            <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Foto anterior">
              <ChevronLeft />
            </button>
            <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Próxima foto">
              <ChevronRight />
            </button>
            {/* Dots */}
            <div className={styles.dots}>
              {imgs.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={e => dot(e, i)}
                  aria-label={`Ir para foto ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* "Ver detalhes" hover overlay */}
        <div className={styles.overlay}>
          <span className={styles.overlayBtn}>Ver Detalhes</span>
        </div>

        {/* Tag */}
        <span className={`${styles.tag} ${styles[`tag--${product.tagVariant}`]}`}>
          {product.tag}
        </span>

        {/* Counter */}
        {imgs.length > 1 && (
          <span className={styles.counter}>{current + 1}/{imgs.length}</span>
        )}
      </div>

      {/* ── Info ── */}
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.cardDesc}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>{product.price}</span>
          <button
            className={styles.iconBtn}
            onClick={e => { e.stopPropagation(); onClick() }}
            aria-label="Comprar"
          >
            <BagIcon />
          </button>
        </div>
      </div>
    </article>
  )
}

function ChevronLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  )
}
function ChevronRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  )
}
function BagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  )
}
