export const CATEGORIES = {
  KVKK: { label: 'KVKK', color: 'bg-red-100 text-red-800', type: 'regulasyon' },
  GDPR: { label: 'GDPR', color: 'bg-blue-100 text-blue-800', type: 'regulasyon' },
  SPK: { label: 'SPK', color: 'bg-green-100 text-green-800', type: 'regulasyon' },
  BTK: { label: 'BTK', color: 'bg-purple-100 text-purple-800', type: 'regulasyon' },
  ISO27001: { label: 'ISO 27001', color: 'bg-yellow-100 text-yellow-800', type: 'regulasyon' },
  NIST: { label: 'NIST', color: 'bg-indigo-100 text-indigo-800', type: 'regulasyon' },
  TEKNOLOJI: { label: 'Teknoloji', color: 'bg-cyan-100 text-cyan-800', type: 'teknoloji' },
} as const

export type CategoryKey = keyof typeof CATEGORIES

export interface ArticleWithSource {
  id: string
  title: string
  content: string | null
  url: string
  imageUrl: string | null
  publishedAt: Date
  sourceId: string
  source: { name: string; url: string }
  category: CategoryKey
  createdAt: Date
}
