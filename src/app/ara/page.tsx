import { Suspense } from 'react'
import SearchContent from './search-content'

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
