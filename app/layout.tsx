import type { Metadata } from 'next'
import './globals.css'
import { Layout } from './components/Layout'

export const metadata: Metadata = {
  metadataBase: new URL('https://leho.in'),
  title: {
    default: 'LEHO | Ladakh Environment and Health Organization',
    template: '%s | LEHO',
  },
  description: 'LEHO supports healthier, self-sustaining communities in Ladakh through ecological farming, renewable resources, environmental health, and local knowledge.',
  keywords: ['Ladakh', 'environment', 'health', 'ecological farming', 'sustainable development', 'LEHO'],
  authors: [{ name: 'Ladakh Environment and Health Organization' }],
  creator: 'Ladakh Environment and Health Organization',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://leho.in',
    siteName: 'Ladakh Environment and Health Organization',
    title: 'LEHO | Ladakh Environment and Health Organization',
    description: 'Healthier, self-sustaining communities in Ladakh through ecological farming, renewable resources, and local knowledge.',
    images: [{ url: '/images/slide_01.jpg', width: 1600, height: 900, alt: 'Ladakh Environment and Health Organization field work' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LEHO | Ladakh Environment and Health Organization',
    description: 'Healthier, self-sustaining communities in Ladakh through ecological farming, renewable resources, and local knowledge.',
    images: ['/images/slide_01.jpg'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    name: 'Ladakh Environment and Health Organization',
    alternateName: 'LEHO',
    url: 'https://leho.in',
    logo: 'https://leho.in/logo.png',
    foundingDate: '1991',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'G H Road, Skara Juk',
      addressLocality: 'Leh',
      addressRegion: 'Ladakh',
      postalCode: '194101',
      addressCountry: 'IN',
    },
    telephone: '+91 1982 252944',
    email: 'president@leho.in',
    sameAs: [
      'https://www.facebook.com/LadakhEnvironmentandHealthOrganization/',
      'https://www.linkedin.com/company/ladakh-environment-and-health-organization/',
      'https://x.com/LEHO_Ladakh',
      'https://www.instagram.com/leho_ladakh/',
    ],
  }

  return (
    <html lang="en-IN">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      </head>
      <body><Layout>{children}</Layout></body>
    </html>
  )
}
