'use client';

import { useState, type ReactNode } from 'react'
import { ChevronUp, Mail, Phone, Menu, X } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

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

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  
  return <div className="site-shell" id="top">
    <header className="site-header"><div className="container header-inner">
      <Link href="/" className="brand"><Image className="brand-mark" src="/logo.png" alt="LEHO" width={49} height={49} priority /><span><strong>Ladakh Environment</strong><small>& Health Organization</small></span></Link>
      <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}<span className="sr-only">{menuOpen ? 'Close' : 'Open'} navigation</span></button>
      <nav id="main-navigation" className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">{navigation.map(([path, label]) => <Link key={path} href={path} onClick={() => setMenuOpen(false)} className={pathname === path ? 'active' : ''}>{label}</Link>)}</nav>
    </div></header>
    <main>{children}</main>
    <footer className="site-footer"><div className="container footer-inner"><div><strong>LEHO</strong><p>G H Road, Skara Juk, Leh, Ladakh, 194101<br />J&K, India</p></div><div><p><a href="tel:+911982252944"><Phone size={14} /> +91 1982 252944</a><br /><a href="mailto:president@leho.in"><Mail size={14} /> president@leho.in</a></p></div><div className="footer-socials"><p>Follow LEHO</p><div>{socialLinks.map((social) => { const SocialIcon = social.icon; return <a href={social.href} target="_blank" rel="noreferrer" aria-label={`${social.name}: ${social.handle}`} key={social.name}><SocialIcon aria-hidden="true" /></a> })}</div></div><a className="back-top" href="#top" aria-label="Back to top"><ChevronUp /></a></div></footer>
  </div>
}
