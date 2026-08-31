import { type ReactNode } from 'react'

export function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) { 
  return <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{children}</h2></div> 
}

export function ContentPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { 
  return <div className="page"><div className="container"><div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h1>{title}</h1></div>{children}</div></div> 
}
