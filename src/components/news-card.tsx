import Link from 'next/link'
import { Card, CardContent } from './ui/card'
import { CATEGORIES, type ArticleWithSource } from '@/types'
import { formatDate, truncate } from '@/lib/utils'

interface Props {
  article: ArticleWithSource
}

export function NewsCard({ article }: Props) {
  const cat = CATEGORIES[article.category]

  return (
    <Link href={`/haber/${article.id}`}>
      <Card className="group hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            {article.imageUrl && (
              <div className="shrink-0 w-20 h-20 rounded-md overflow-hidden bg-muted">
                <img
                  src={article.imageUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${cat.color}`}>
                  {cat.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {article.source.name}
                </span>
              </div>
              <h3 className="font-medium text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                {article.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                {article.content ? truncate(article.content, 120) : ''}
              </p>
              <span className="text-xs text-muted-foreground mt-1 block">
                {formatDate(article.publishedAt)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
