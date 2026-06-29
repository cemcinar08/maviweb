'use client'

import { useState } from 'react'
import { NewsFeed } from '@/components/news-feed'
import { CategoryFilter } from '@/components/category-filter'
import { NewsletterForm } from '@/components/newsletter-form'
import type { CategoryKey } from '@/types'

export default function Home() {
  const [regCategory, setRegCategory] = useState<CategoryKey | null>(null)
  const [techCategory, setTechCategory] = useState<CategoryKey | null>(null)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">RegNews</h1>
        <p className="text-sm text-muted-foreground">
          Regülasyon ve teknoloji haberleri tek ekranda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Regülasyon</h2>
            <span className="text-xs text-muted-foreground">KVKK · GDPR · NIST · SPK · BTK · ISO 27001</span>
          </div>
          <div className="mb-4">
            <CategoryFilter
              selected={regCategory}
              type="regulasyon"
              onSelect={setRegCategory}
            />
          </div>
          <NewsFeed type="regulasyon" category={regCategory} />

          <div className="mt-6">
            <NewsletterForm />
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Teknoloji</h2>
            <span className="text-xs text-muted-foreground">ShiftDelete · Webtekno · DH · Technopat · ÇözümPark</span>
          </div>
          <div className="mb-4">
            <CategoryFilter
              selected={techCategory}
              type="teknoloji"
              onSelect={setTechCategory}
            />
          </div>
          <NewsFeed type="teknoloji" category={techCategory} />
        </section>
      </div>
    </div>
  )
}
