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
          'px-3 py-1 rounded-full text-xs font-medium transition-colors',
          !selected ? 'bg-[#3b5998] text-white' : 'bg-[#f0f1f3] text-[#656a73] hover:bg-[#e8ecf0]'
        )}
      >
        Tümü
      </button>
      {categories.map(([key, cat]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={cn(
            'px-3 py-1 rounded-full text-xs font-medium transition-colors',
            selected === key ? cat.color : 'bg-[#f0f1f3] text-[#656a73] hover:bg-[#e8ecf0]'
          )}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
