// src/components/About/About.jsx
import React from 'react'
import useIntersection from '../../hooks/useIntersection'
import config from '../../data/config'
import styles from './About.module.css'

const STATS = [
  { num: 'PREMIUM', label: 'Produtos de qualidade premium' },
  { num: 'PAIXÃO', label: 'Feito pra quem vive o futebol' },
  { num: '24h',     label: 'Resposta no WhatsApp' },
]

export default function About() {
  const [textRef, textVisible] = useIntersection()
  const [statsRef, statsVisible] = useIntersection()

  return (
    <section className={styles.section} id="about">
      <div className={styles.inner}>

        <div
          ref={textRef}
          className={`${styles.text} ${textVisible ? styles.visible : ''}`}
        >
          <span className={styles.label}>Sobre nós</span>
          <h2 className={styles.title}>Somos MF Company</h2>
          <p className={styles.body}>
            Nascemos da paixão pelo futebol e pelo estilo brasileiro. Trazemos
            as melhores camisas oficiais com atendimento personalizado e preços
            acessíveis. Cada compra é feita diretamente pelo WhatsApp — rápido,
            fácil e seguro.
          </p>
          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.igBtn}
          >
            <IgIcon />
            Siga no Instagram
          </a>
        </div>

        <div
          ref={statsRef}
          className={`${styles.stats} ${statsVisible ? styles.visible : ''}`}
        >
          {STATS.map((s, i) => (
            <div
              key={i}
              className={styles.stat}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
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
