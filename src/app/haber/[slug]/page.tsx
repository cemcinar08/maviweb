import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { CATEGORIES } from '@/types'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink } from 'lucide-react'

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await prisma.article.findUnique({
    where: { id: params.slug },
    include: { source: { select: { name: true, url: true } } },
  })

  if (!article) notFound()

  const cat = CATEGORIES[article.category]

  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" />
        Geri
      </Link>

      <div className="flex items-center gap-2 mb-3">
        <span className={`inline-block px-2.5 py-0.5 rounded text-xs font-medium ${cat.color}`}>
          {cat.label}
        </span>
        <span className="text-sm text-muted-foreground">{article.source.name}</span>
        <span className="text-sm text-muted-foreground">·</span>
        <time className="text-sm text-muted-foreground">{formatDate(article.publishedAt)}</time>
      </div>

      <h1 className="text-2xl font-bold leading-tight mb-4">{article.title}</h1>

      {article.imageUrl && (
        <div className="rounded-xl overflow-hidden mb-6">
          <img src={article.imageUrl} alt="" className="w-full h-auto max-h-96 object-cover" />
        </div>
      )}

      {article.content && (
        <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {article.content}
        </div>
      )}

      <div className="mt-8 pt-6 border-t">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Kaynakta Oku
          </Button>
        </a>
      </div>
    </article>
  )
}
