'use client';

import { useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { ContentPage, SectionTitle } from '../components/PageComponents'

const galleryImages = [
  ['portfolio-01.jpg', 'Community and landscape'], ['portfolio-06.jpg', 'Local work in Ladakh'],
  ['portfolio-03.jpg', 'Sustainable living'], ['portfolio-07.jpg', 'People and place'],
  ['portfolio-08.jpg', 'Traditional knowledge'], ['portfolio-02.jpg', 'Ecology and livelihoods'],
]

export default function Gallery() { const [selected, setSelected] = useState<number | null>(null); const current = selected === null ? null : galleryImages[selected]; return <ContentPage eyebrow="Images from the field" title="Gallery"><div className="gallery-grid">{galleryImages.map(([image, caption], index) => <button className="gallery-item" key={image} onClick={() => setSelected(index)}><img src={`/images/${image}`} alt={caption} /><span>{caption}<ArrowRight size={15} /></span></button>)}</div>{current && <div className="lightbox" role="dialog" aria-modal="true" aria-label={current[1]} onClick={() => setSelected(null)}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close image"><X /></button><button className="lightbox-nav prev" onClick={(event) => { event.stopPropagation(); setSelected((selected! - 1 + galleryImages.length) % galleryImages.length) }} aria-label="Previous image"><ArrowLeft /></button><img src={`/images/${current[0]}`} alt={current[1]} onClick={(event) => event.stopPropagation()} /><button className="lightbox-nav next" onClick={(event) => { event.stopPropagation(); setSelected((selected! + 1) % galleryImages.length) }} aria-label="Next image"><ArrowRight /></button><p>{current[1]}</p></div>}</ContentPage> }
