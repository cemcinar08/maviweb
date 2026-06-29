'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { NewsCard } from '@/components/news-card'
import { Button } from '@/components/ui/button'
import type { ArticleWithSource } from '@/types'
import Link from 'next/link'

export default function ProfilePage() {
  const { data: session } = useSession()
  const [favorites, setFavorites] = useState<ArticleWithSource[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session) return

    fetch('/api/favorites')
      .then((res) => res.json())
      .then((data) => setFavorites(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [session])

  if (!session) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Profil</h1>
        <p className="text-muted-foreground mb-4">Giriş yapmanız gerekiyor.</p>
        <Link href="/auth/giris">
          <Button>Giriş Yap</Button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Profil</h1>
        <p className="text-sm text-muted-foreground">{session.user?.email}</p>
      </div>

      <h2 className="text-lg font-semibold mb-4">Favori Haberlerim</h2>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : favorites.length > 0 ? (
        <div className="space-y-3">
          {favorites.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">Henüz favori haberiniz yok.</p>
      )}
    </div>
  )
}
