import { prisma } from '@/lib/prisma'
import { NewsCard } from '@/components/news-card'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function SourcePage({ params }: { params: { kaynak: string } }) {
  const source = await prisma.source.findUnique({
    where: { id: params.kaynak },
  })

  if (!source) {
    return <div className="text-center py-12 text-muted-foreground">Kaynak bulunamadı.</div>
  }

  const articles = await prisma.article.findMany({
    where: { sourceId: source.id },
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

      <div className="mb-6">
        <h1 className="text-2xl font-bold">{source.name}</h1>
        <p className="text-sm text-muted-foreground">
          {articles.length} haber · <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline">Kaynağa git</a>
        </p>
      </div>

      <div className="space-y-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  )
}
