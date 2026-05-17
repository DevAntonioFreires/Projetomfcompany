// src/hooks/useScrolled.js
import { useState, useEffect } from 'react'

export default function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
