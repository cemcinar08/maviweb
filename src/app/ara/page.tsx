'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { NewsCard } from '@/components/news-card'
import type { ArticleWithSource } from '@/types'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const [articles, setArticles] = useState<ArticleWithSource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!q) return

    const fetchResults = async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setArticles(data.articles)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [q])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">Arama: {q}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {articles.length} sonuç bulundu
      </p>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="space-y-3">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-12">
          Sonuç bulunamadı.
        </p>
      )}
    </div>
  )
}
