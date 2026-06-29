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
    <div className="space-y-8">
      {/* Hero / Featured */}
      <section className="bg-gradient-to-br from-[#3b5998]/5 to-transparent rounded-xl p-6 border border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-6 bg-[#3b5998] rounded-full" />
          <h1 className="text-2xl font-bold text-[#1d2129]">RegNews</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          KVKK, GDPR, NIST, SPK, BTK, ISO 27001 regülasyon haberleri ve teknoloji dünyasından son gelişmeler.
        </p>
      </section>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#e67e22] rounded-full" />
            <h2 className="section-title">Regülasyon</h2>
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
            <div className="container-wrapper">
              <h3 className="text-sm font-semibold mb-3">E-posta Bülteni</h3>
              <NewsletterForm />
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-[#3b5998] rounded-full" />
            <h2 className="section-title">Teknoloji</h2>
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
