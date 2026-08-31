import type { MetadataRoute } from 'next'

const baseUrl = 'https://leho.in'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: baseUrl, changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/mission`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/projects`, changeFrequency: 'yearly', priority: 0.8 },
    { url: `${baseUrl}/gallery`, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/tenders`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'yearly', priority: 0.8 },
  ]
}
