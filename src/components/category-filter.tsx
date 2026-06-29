'use client'

import { CATEGORIES, type CategoryKey } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  selected: CategoryKey | null
  type: 'regulasyon' | 'teknoloji'
  onSelect: (category: CategoryKey | null) => void
}

export function CategoryFilter({ selected, type, onSelect }: Props) {
  const categories = Object.entries(CATEGORIES).filter(
    ([_, v]) => v.type === type
  ) as [CategoryKey, typeof CATEGORIES[CategoryKey]][]

  return (
    <div className="flex flex-wrap gap-1.5">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
          !selected ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
        )}
      >
        Tümü
      </button>
      {categories.map(([key, cat]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={cn(
            'px-2.5 py-1 rounded-md text-xs font-medium transition-colors',
            selected === key ? cat.color : 'bg-muted hover:bg-muted/80'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
