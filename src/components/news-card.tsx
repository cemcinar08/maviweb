import Link from 'next/link'
import { CATEGORIES, type ArticleWithSource } from '@/types'
import { formatDate } from '@/lib/utils'

interface Props {
  article: ArticleWithSource
}

export function NewsCard({ article }: Props) {
  const cat = CATEGORIES[article.category]

  return (
    <Link href={`/haber/${article.id}`}>
      <article className="container-wrapper flex gap-4 p-4 group hover:shadow-md transition-shadow">
        {article.imageUrl && (
          <div className="shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-muted">
            <img
              src={article.imageUrl}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${cat.color}`}>
              {cat.label}
            </span>
            <span className="text-[11px] text-muted-foreground">
              {article.source.name}
            </span>
          </div>
          <h3 className="post-title text-sm leading-snug line-clamp-2 group-hover:bg-[length:100%_1px]">
            {article.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">
            {article.content || ''}
          </p>
          <span className="text-[11px] text-muted-foreground mt-2 block">
            {formatDate(article.publishedAt)}
          </span>
        </div>
      </article>
    </Link>
  )
}
