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
  return <><section className="hero" aria-label="LEHO highlights"><div className="hero-slides">{slides.map((item, index) => <img key={item.image} src={item.image} alt={item.label} className={index === slide ? 'visible' : ''} />)}</div><div className="hero-overlay"><div className="container"><p className="eyebrow">Since 1991 · Leh, Ladakh</p><h1>Rooted in Ladakh.<br /><em>Working for tomorrow.</em></h1><p>Building healthier communities through ecological farming, renewable resources, and local knowledge.</p><Link className="button button-light" href="/mission">Our mission <ArrowRight size={16} /></Link></div></div><div className="hero-controls"><button type="button" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous slide"><ArrowLeft /></button><div>{slides.map((item, index) => <button type="button" key={item.image} className={index === slide ? 'current' : ''} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === slide}>{String(index + 1).padStart(2, '0')}</button>)}</div><button type="button" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next slide"><ArrowRight /></button></div></section><section className="intro-band"><div className="container intro-grid"><div><p className="eyebrow">Our beginning</p><h2>A practical vision for a changing Ladakh.</h2></div><p>LEHO came into existence on 1 July 1991. Its founders saw the need for an organization focused on sustainable development, ecology, and health in response to changes in agriculture, food habits, social values, and culture across Ladakhi societies.</p></div></section><section className="feature-band"><div className="container feature-grid"><div><p className="eyebrow">A holistic approach</p><h2>Local resources.<br />Lasting solutions.</h2></div><p>Our work connects land, water, vegetation, and livestock with the age-old traditions and cultures of village communities. Explore the ideas and programmes that continue to guide our mission today.</p></div></section></>
}
