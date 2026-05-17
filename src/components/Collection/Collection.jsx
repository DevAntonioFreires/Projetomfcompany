// src/components/Collection/Collection.jsx
import React from 'react'
import products from '../../data/products'
import ProductCard from '../ProductCard/ProductCard'
import styles from './Collection.module.css'

export default function Collection({ onSelectProduct }) {
  return (
    <section className={styles.section} id="collection">
      <div className={styles.header}>
        <img src="/img/mf-logo.png" alt="MF Company" className={styles.logoImg} />
        <span className={styles.label}>Produtos</span>
        <h2 className={styles.title}>Coleção Brasil 2026</h2>
        <p className={styles.sub}>Cada peça é uma declaração de amor ao futebol brasileiro.</p>
      </div>

      <div className={styles.grid}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onClick={() => onSelectProduct(product)}
          />
        ))}
      </div>
    </section>
  )
}
