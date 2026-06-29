'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Input } from './ui/input'

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/ara?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="haber ara..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-8 text-sm"
      />
    </form>
  )
}
