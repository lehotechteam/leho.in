import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ladakh Fieldwork Gallery',
  description: 'View photographs from LEHO\'s community, ecological farming, environmental, and sustainable development work across Ladakh.',
  alternates: { canonical: '/gallery' },
}

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
