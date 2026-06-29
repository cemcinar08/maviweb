import { prisma } from '@/lib/prisma'
import { CATEGORIES, type CategoryKey } from '@/types'
import { NewsCard } from '@/components/news-card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function CategoryPage({ params }: { params: { kategori: string } }) {
  const category = params.kategori as CategoryKey
  const cat = CATEGORIES[category]

  const articles = await prisma.article.findMany({
    where: { category },
    include: { source: { select: { name: true, url: true } } },
    orderBy: { publishedAt: 'desc' },
    take: 50,
  })

  return (
    <div>
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" />
        Geri
      </Link>

      <div className="flex items-center gap-3 mb-6">
        {cat && <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${cat.color}`}>{cat.label}</span>}
        <span className="text-sm text-muted-foreground">({articles.length} haber)</span>
      </div>

      <div className="space-y-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
