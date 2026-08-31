import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects and Programmes',
  description: 'Explore LEHO\'s ecological agriculture, watershed development, health, renewable energy, biodiversity, and community development projects in Ladakh.',
  alternates: { canonical: '/projects' },
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children
}
