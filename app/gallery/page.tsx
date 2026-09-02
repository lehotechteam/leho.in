'use client';

import { useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { ContentPage, SectionTitle } from '../components/PageComponents'

const galleryImages = [
  { src: 'portfolio-01.jpg', caption: 'Community and landscape', size: 'large' },
  { src: 'portfolio-06.jpg', caption: 'Local work in Ladakh', size: 'medium' },
  { src: 'portfolio-03.jpg', caption: 'Sustainable living', size: 'medium' },
  { src: 'portfolio-07.jpg', caption: 'People and place', size: 'large' },
  { src: 'portfolio-08.jpg', caption: 'Traditional knowledge', size: 'small' },
  { src: 'portfolio-02.jpg', caption: 'Ecology and livelihoods', size: 'medium' },
]

export default function Gallery() { 
  const [selected, setSelected] = useState<number | null>(null)
  const current = selected === null ? null : galleryImages[selected]
  
  return (
    <ContentPage eyebrow="Images from the field" title="Gallery">
      <div className="gallery-grid">
        {galleryImages.map((item, index) => (
          <button 
            className={`gallery-item gallery-item-${item.size}`} 
            key={item.src} 
            onClick={() => setSelected(index)}
          >
            <img src={`/images/${item.src}`} alt={item.caption} />
            <div className="gallery-caption">
              <span>{item.caption}</span>
              <ArrowRight size={15} />
            </div>
          </button>
        ))}
      </div>
      
      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption} onClick={() => setSelected(null)}>
          <button className="close-button" onClick={() => setSelected(null)} aria-label="Close image">
            <X />
          </button>
          <button 
            className="lightbox-nav prev" 
            onClick={(event) => { 
              event.stopPropagation(); 
              setSelected((selected! - 1 + galleryImages.length) % galleryImages.length) 
            }} 
            aria-label="Previous image"
          >
            <ArrowLeft />
          </button>
          <img src={`/images/${current.src}`} alt={current.caption} onClick={(event) => event.stopPropagation()} />
          <button 
            className="lightbox-nav next" 
            onClick={(event) => { 
              event.stopPropagation(); 
              setSelected((selected! + 1) % galleryImages.length) 
            }} 
            aria-label="Next image"
          >
            <ArrowRight />
          </button>
          <p>{current.caption}</p>
        </div>
      )}
    </ContentPage>
  )
}
