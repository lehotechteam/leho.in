import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Mission',
  description: 'Discover LEHO\'s mission and commitments to sustainable societies, ecological farming, environmental health, biodiversity, and Ladakh\'s indigenous knowledge.',
  alternates: { canonical: '/mission' },
}

export default function MissionLayout({ children }: { children: React.ReactNode }) {
  return children
}
