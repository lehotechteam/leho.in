import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tender Notices',
  description: 'Browse public tender and quotation notices published by the Ladakh Environment and Health Organization, organized by date.',
  alternates: { canonical: '/tenders' },
}

export default function TendersLayout({ children }: { children: React.ReactNode }) {
  return children
}
