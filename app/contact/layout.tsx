import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact LEHO',
  description: 'Contact the Ladakh Environment and Health Organization in Leh, Ladakh, for information about our environmental health and sustainable development work.',
  alternates: { canonical: '/contact' },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
