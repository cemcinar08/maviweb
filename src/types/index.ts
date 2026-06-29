export const CATEGORIES = {
  KVKK: { label: 'KVKK', color: 'bg-[#e67e22] text-white', type: 'regulasyon' },
  GDPR: { label: 'GDPR', color: 'bg-[#2ecc71] text-white', type: 'regulasyon' },
  SPK: { label: 'SPK', color: 'bg-[#9b59b6] text-white', type: 'regulasyon' },
  BTK: { label: 'BTK', color: 'bg-[#34495e] text-white', type: 'regulasyon' },
  ISO27001: { label: 'ISO 27001', color: 'bg-[#795548] text-white', type: 'regulasyon' },
  NIST: { label: 'NIST', color: 'bg-[#4CAF50] text-white', type: 'regulasyon' },
  TEKNOLOJI: { label: 'Teknoloji', color: 'bg-[#3b5998] text-white', type: 'teknoloji' },
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
