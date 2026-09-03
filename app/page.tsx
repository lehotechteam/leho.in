'use client';

import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const slides = [
  { image: '/images/slide_01.jpg', label: 'Working with Ladakh\'s villages and landscapes' },
  { image: '/images/slide_02.jpg', label: 'Practical ideas for resilient communities' },
  { image: '/images/slide_03.jpg', label: 'Growing a sustainable future in the high desert' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6000); return () => window.clearInterval(timer) }, [])
  return <><section className="hero" aria-label="LEHO highlights"><div className="hero-slides">{slides.map((item, index) => <img key={item.image} src={item.image} alt={item.label} className={index === slide ? 'visible' : ''} />)}</div><div className="hero-overlay"><div className="container"><p className="eyebrow">Since 1991 · Leh, Ladakh</p><h1>Rooted in Ladakh.<br /><em>Led by its communities.</em></h1><p>Empowering community-led development, ecological integrity, and climate resilience across Ladakh's villages and towns.</p><Link className="button button-light" href="/mission">Our mission <ArrowRight size={16} /></Link></div></div><div className="hero-controls"><button type="button" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous slide"><ArrowLeft /></button><div>{slides.map((item, index) => <button type="button" key={item.image} className={index === slide ? 'current' : ''} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === slide}>{String(index + 1).padStart(2, '0')}</button>)}</div><button type="button" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next slide"><ArrowRight /></button></div></section><section className="intro-band"><div className="container intro-grid"><div><p className="eyebrow">Our beginning</p><h2>A practical vision for a changing Ladakh.</h2></div><p>In 1991, LEHO's founders saw a region in transition — farming practices, food habits, and social values were all shifting, and with them, Ladakh's ecological and cultural fabric. LEHO was formed to meet that moment: sustainable development built on Ladakh's own traditional wisdom and community strength, not borrowed solutions.</p></div></section><section className="feature-band"><div className="container feature-grid"><div><p className="eyebrow">A holistic approach</p><h2>Local resources.<br />Lasting solutions.</h2></div><p>We promote the holistic, integrated use of land, water, vegetation, and livestock — always in step with Ladakh's traditional wisdom and community strength. Explore the principles and programmes that guide our work today.</p></div></section></>
}
