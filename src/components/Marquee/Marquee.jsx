// src/components/Marquee/Marquee.jsx
import React from 'react'
import styles from './Marquee.module.css'

const ITEMS = ['BRASIL 2026', '★', 'COLEÇÃO OFICIAL', '★', 'MF COMPANY', '★']
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS] // duplicate for seamless loop

export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {TRACK.map((item, i) => (
          <span key={i} className={item === '★' ? styles.star : styles.text}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
