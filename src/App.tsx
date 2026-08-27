import { useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronUp, Download, ExternalLink, Mail, MapPin, Menu, Phone, X } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'

const navigation = [
  ['/', 'Home'],
  ['/gallery', 'Gallery'],
  ['/mission', 'Mission'],
  ['/projects', 'Projects'],
  ['/tenders', 'Tenders'],
  ['/contact', 'Contact'],
]

const socialLinks = [
  { name: 'Facebook', handle: '@LadakhEnvironmentandHealthOrganization', href: 'https://www.facebook.com/LadakhEnvironmentandHealthOrganization/', icon: FaFacebookF },
  { name: 'LinkedIn', handle: '@leho-ladakh', href: 'https://www.linkedin.com/company/ladakh-environment-and-health-organization/', icon: FaLinkedinIn },
  { name: 'X', handle: '@LEHO_Ladakh', href: 'https://x.com/LEHO_Ladakh', icon: FaXTwitter },
  { name: 'Instagram', handle: '@leho_ladakh', href: 'https://www.instagram.com/leho_ladakh/', icon: FaInstagram },
  { name: 'YouTube', handle: '@LEHO Ladakh', href: 'https://www.youtube.com/results?search_query=Ladakh+Environment+and+Health+Organization', icon: FaYoutube },
]

const slides = [
  { image: '/images/slide_01.jpg', label: 'Working with Ladakh\'s villages and landscapes' },
  { image: '/images/slide_02.jpg', label: 'Practical ideas for resilient communities' },
  { image: '/images/slide_03.jpg', label: 'Growing a sustainable future in the high desert' },
]

const galleryImages = [
  ['portfolio-01.jpg', 'Community and landscape'], ['portfolio-06.jpg', 'Local work in Ladakh'],
  ['portfolio-03.jpg', 'Sustainable living'], ['portfolio-07.jpg', 'People and place'],
  ['portfolio-08.jpg', 'Traditional knowledge'], ['portfolio-02.jpg', 'Ecology and livelihoods'],
]

const aims = [
  'Sustain and improve ecological farming, the backbone of Ladakh\'s economy.',
  'Raise awareness about environmental cleanliness, nutrition, and prevention of drug, smoking, alcoholism, and pollution-related harms.',
  'Promote afforestation, biodiversity, and ecological restoration.',
  'Facilitate the exchange of experiences and information among communities and groups.',
  'Practice and improve environmentally friendly, time-tested indigenous knowledge and technologies.',
  'Encourage and preserve the diversity of culture, tradition, and language.',
  'Encourage equal gender justice.',
  'Achieve the self-sustainability of LEHO.',
]

const completedProjects = [
  'Integrated self-sustaining village development, including the adoption of Umla village from 1994 to 1999.',
  'Twelve watershed development projects and demonstrations of ecological farming in 46 villages from 1996 to 2005.',
  'Fabrication of manual dehairing machines and improved water flour mills.',
  'Solar vegetable and fruit dryers, passive solar greenhouses, homes, and poultry houses.',
  'Health programme for control of silicosis, including distribution and sale of 6,000 filtered masks.',
  'Handicraft and handloom development, including vegetable dyeing and Ladakhi patterns for Pashmina shawls.',
  'Appropriate technology development and application.',
]

const activeProjects = ['Integrated self-sustaining village and watershed development', 'Ecological agriculture', 'Health programme', 'Handicraft and handloom development', 'Seminars, conferences, and training', 'Appropriate technology', 'Solar energy: improved greenhouses, passive solar houses, and solar poultry houses', 'Pashmina development', 'Fruit and vegetable preservation', 'Marketing of ecological products', 'Biodiversity conservation', 'Climate change initiatives', 'Consultancy for greenhouses, passive solar houses, vegetable dyeing, and Pashmina processing', 'Poly sheet supply for green and passive solar houses', 'Vegetable and fruit processing']

const tenders = [
  { date: 'August 2026', items: [['portfolio-24.pdf', 'portfolio-thumb-24.jpeg', 'Quotation document', true]] },
  { date: 'January 2026', items: [['portfolio-24.jpeg', 'portfolio-thumb-24.jpeg', 'Tender notice'], ['portfolio-23.jpeg', 'portfolio-thumb-23.jpeg', 'Tender notice'], ['portfolio-25.jpeg', 'portfolio-thumb-25.jpeg', 'Tender notice']] },
  { date: 'December 2022', items: [['portfolio-22.jpg', 'portfolio-thumb-22.jpg', 'Tender notice']] },
  { date: 'November 2022', items: [['portfolio-21.jpg', 'portfolio-thumb-21.jpg', 'Tender notice'], ['portfolio-18.jpeg', 'portfolio-thumb-18.jpeg', 'Tender notice'], ['portfolio-19.jpeg', 'portfolio-thumb-19.jpeg', 'Tender notice']] },
  { date: 'July 2022', items: [['portfolio-17.jpeg', 'portfolio-thumb-17.jpeg', 'Tender notice'], ['portfolio-15.jpg', 'portfolio-thumb-15.jpg', 'Tender notice'], ['portfolio-16.jpg', 'portfolio-thumb-16.jpg', 'Tender notice']] },
  { date: 'April 2022', items: [['portfolio-13.jpeg', 'portfolio-thumb-13.jpeg', 'Tender notice'], ['portfolio-14.jpeg', 'portfolio-thumb-14.jpeg', 'Tender notice']] },
]

function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <div className="site-shell">
    <header className="site-header"><div className="container header-inner">
      <NavLink to="/" className="brand"><span className="brand-mark">LEHO</span><span><strong>Ladakh Environment</strong><small>& Health Organization</small></span></NavLink>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}<span className="sr-only">{menuOpen ? 'Close' : 'Open'} navigation</span></button>
      <nav id="main-navigation" className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">{navigation.map(([path, label]) => <NavLink key={path} to={path} onClick={() => setMenuOpen(false)} className={({ isActive }) => isActive ? 'active' : ''}>{label}</NavLink>)}</nav>
    </div></header>
    <main>{children}</main>
    <footer className="site-footer"><div className="container footer-inner"><div><strong>LEHO</strong><p>G H Road, Skara Juk, Leh, Ladakh, 194101<br />J&K, India</p></div><div><p><a href="tel:+911982252944"><Phone size={14} /> +91 1982 252944</a><br /><a href="mailto:president@leho.in"><Mail size={14} /> president@leho.in</a></p></div><div className="footer-socials"><p>Follow LEHO</p><div>{socialLinks.map((social) => { const SocialIcon = social.icon; return <a href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.name}: ${social.handle}`} key={social.name}><SocialIcon aria-hidden="true" /></a> })}</div></div><a className="back-top" href="#top" aria-label="Back to top"><ChevronUp /></a></div></footer>
  </div>
}

function SectionTitle({ eyebrow, children }: { eyebrow?: string; children: ReactNode }) { return <div className="section-heading">{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{children}</h2></div> }

function Home() {
  const [slide, setSlide] = useState(0)
  useEffect(() => { const timer = window.setInterval(() => setSlide((current) => (current + 1) % slides.length), 6000); return () => window.clearInterval(timer) }, [])
  return <><section className="hero" aria-label="LEHO highlights"><div className="hero-slides">{slides.map((item, index) => <img key={item.image} src={item.image} alt={item.label} className={index === slide ? 'visible' : ''} />)}</div><div className="hero-overlay"><div className="container"><p className="eyebrow">Since 1991 · Leh, Ladakh</p><h1>Rooted in Ladakh.<br /><em>Working for tomorrow.</em></h1><p>Building healthier communities through ecological farming, renewable resources, and local knowledge.</p><NavLink className="button button-light" to="/mission">Our mission <ArrowRight size={16} /></NavLink></div></div><div className="hero-controls"><button type="button" onClick={() => setSlide((slide - 1 + slides.length) % slides.length)} aria-label="Previous slide"><ArrowLeft /></button><div>{slides.map((item, index) => <button type="button" key={item.image} className={index === slide ? 'current' : ''} onClick={() => setSlide(index)} aria-label={`Go to slide ${index + 1}`} aria-current={index === slide}>{String(index + 1).padStart(2, '0')}</button>)}</div><button type="button" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Next slide"><ArrowRight /></button></div></section><section className="intro-band"><div className="container intro-grid"><div><p className="eyebrow">Our beginning</p><h2>A practical vision for a changing Ladakh.</h2></div><p>LEHO came into existence on 1 July 1991. Its founders saw the need for an organization focused on sustainable development, ecology, and health in response to changes in agriculture, food habits, social values, and culture across Ladakhi societies.</p></div></section><section className="feature-band"><div className="container feature-grid"><div><p className="eyebrow">A holistic approach</p><h2>Local resources.<br />Lasting solutions.</h2></div><p>Our work connects land, water, vegetation, and livestock with the age-old traditions and cultures of village communities. Explore the ideas and programmes that continue to shape this work.</p><NavLink className="text-link" to="/projects">Explore our work <ArrowRight size={16} /></NavLink></div></section></>
}

function ContentPage({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) { return <div className="page"><div className="container"><SectionTitle eyebrow={eyebrow}>{title}</SectionTitle>{children}</div></div> }

function Mission() { return <ContentPage eyebrow="The reason we work" title="Mission"><div className="lead-statement">To promote sustainable societies at village and town level through self-sustaining development models based on local renewable natural resources.</div><SectionTitle eyebrow="Eight commitments">Aims and objectives</SectionTitle><ol className="numbered-list">{aims.map((aim) => <li key={aim}>{aim}</li>)}</ol></ContentPage> }

function Projects() { return <ContentPage eyebrow="From ideas to action" title="Achievements & projects"><div className="project-columns"><section><SectionTitle eyebrow="A record of work">Completed projects</SectionTitle><ul className="clean-list">{completedProjects.map((project) => <li key={project}>{project}</li>)}</ul></section><section><SectionTitle eyebrow="Continuing the work">Programmes under implementation</SectionTitle><ul className="clean-list">{activeProjects.map((project) => <li key={project}>{project}</li>)}</ul></section></div></ContentPage> }

function Gallery() { const [selected, setSelected] = useState<number | null>(null); const current = selected === null ? null : galleryImages[selected]; return <ContentPage eyebrow="Images from the field" title="Gallery"><div className="gallery-grid">{galleryImages.map(([image, caption], index) => <button className="gallery-item" key={image} onClick={() => setSelected(index)}><img src={`/images/${image}`} alt={caption} /><span>{caption}<ArrowRight size={15} /></span></button>)}</div>{current && <div className="lightbox" role="dialog" aria-modal="true" aria-label={current[1]} onClick={() => setSelected(null)}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close image"><X /></button><button className="lightbox-nav prev" onClick={(event) => { event.stopPropagation(); setSelected((selected! - 1 + galleryImages.length) % galleryImages.length) }} aria-label="Previous image"><ArrowLeft /></button><img src={`/images/${current[0]}`} alt={current[1]} onClick={(event) => event.stopPropagation()} /><button className="lightbox-nav next" onClick={(event) => { event.stopPropagation(); setSelected((selected! + 1) % galleryImages.length) }} aria-label="Next image"><ArrowRight /></button><p>{current[1]}</p></div>}</ContentPage> }

function Tenders() { return <ContentPage eyebrow="Public notices & documents" title="Tender archive"><p className="page-intro">Browse LEHO tender and quotation notices, organized by publication date. Open a notice for a closer look or download the August 2026 quotation as a PDF.</p><div className="tender-list">{tenders.map((group) => <section className="tender-group" key={group.date}><h3>{group.date}</h3><div className="tender-items">{group.items.map(([file, thumb, label, pdf]) => <a className="tender-item" href={`/images/${file}`} target="_blank" rel="noreferrer" key={`${file}-${label}`}><img src={`/images/${thumb}`} alt={`${group.date} ${label}`} /><span><strong>{label}</strong><small>{pdf ? 'PDF document' : 'View notice'} <ExternalLink size={13} /></small></span>{pdf && <Download size={17} />}</a>)}</div></section>)}</div></ContentPage> }

function Contact() { return <ContentPage eyebrow="Come and connect" title="Contact LEHO"><div className="contact-grid"><div><p className="contact-lead">Ladakh Environment<br />and Health Organization</p><p>G H Road, Skara Juk<br />Leh, Ladakh, 194101<br />J&K, India</p><a className="button button-dark" href="https://maps.google.com/?q=G+H+Road,+Skara+Juk,+Leh,+Ladakh" target="_blank" rel="noreferrer"><MapPin size={16} /> View location</a></div><div className="contact-details"><a href="tel:+911982252944"><Phone /> <span><small>Telephone</small>+91 1982 252944</span></a><a href="tel:+919419180650"><Phone /> <span><small>Mobile</small>+91 9419180650</span></a><a href="mailto:president@leho.in"><Mail /> <span><small>Email</small>president@leho.in</span></a><div className="contact-socials"><p className="eyebrow">Follow LEHO</p>{socialLinks.map((social) => { const SocialIcon = social.icon; return <a href={social.href} target="_blank" rel="noreferrer" key={social.name}><SocialIcon aria-hidden="true" /><span><small>{social.name}</small>{social.handle}</span><ExternalLink size={14} /></a> })}</div></div></div></ContentPage> }

function App() {
  return <BrowserRouter><Layout><Routes><Route path="/" element={<Home />} /><Route path="/gallery" element={<Gallery />} /><Route path="/mission" element={<Mission />} /><Route path="/projects" element={<Projects />} /><Route path="/tenders" element={<Tenders />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<Home />} /></Routes></Layout></BrowserRouter>
}

export default App
