import React, { useState } from 'react'
import Header    from './components/Header/Header'
import Hero      from './components/Hero/Hero'
import Marquee   from './components/Marquee/Marquee'
import Collection from './components/Collection/Collection'
import About     from './components/About/About'
import Footer    from './components/Footer/Footer'
import Modal           from './components/Modal/Modal'
import FreteSimulator from './components/FreteSimulator/FreteSimulator'

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState(null)

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Collection onSelectProduct={setSelectedProduct} />
        <FreteSimulator />
        <About />
      </main>
      <Footer />

      {selectedProduct && (
        <Modal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
