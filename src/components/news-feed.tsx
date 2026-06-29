'use client'

import { useEffect, useState, useCallback } from 'react'
import { NewsCard } from './news-card'
import type { ArticleWithSource, CategoryKey } from '@/types'

interface Props {
  type: 'regulasyon' | 'teknoloji'
  category?: CategoryKey | null
  sourceId?: string
}

export function NewsFeed({ type, category, sourceId }: Props) {
  const [articles, setArticles] = useState<ArticleWithSource[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(true)

  const fetchNews = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams()
    params.set('type', type)
    params.set('page', page.toString())
    if (category) params.set('category', category)
    if (sourceId) params.set('sourceId', sourceId)

    try {
      const res = await fetch(`/api/news?${params}`)
      const data = await res.json()

      if (page === 1) {
        setArticles(data.articles)
      } else {
        setArticles((prev) => [...prev, ...data.articles])
      }
      setHasMore(page < data.totalPages)
    } catch (err) {
      console.error('Feed fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [type, category, sourceId, page])

  useEffect(() => {
    setPage(1)
  }, [category, sourceId])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  if (loading && articles.length === 0) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <div className="space-y-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>

      {articles.length === 0 && !loading && (
        <p className="text-center text-muted-foreground py-8 text-sm">
          Henüz haber yok.
        </p>
      )}

      {hasMore && articles.length > 0 && (
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={loading}
          className="w-full py-3 mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
        >
          {loading ? 'Yükleniyor...' : 'Daha fazla'}
        </button>
      )}
    </div>
  )
}
