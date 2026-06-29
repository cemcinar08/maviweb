'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, frequency: 'daily' }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="rounded-xl border bg-muted/50 p-4">
      <h3 className="font-semibold text-sm mb-1">Email Bülteni</h3>
      <p className="text-xs text-muted-foreground mb-3">
        Günlük regülasyon ve teknoloji haberleri emailinize gelsin.
      </p>

      {status === 'success' ? (
        <p className="text-sm text-green-600">Abone oldunuz!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-8 text-sm flex-1"
          />
          <Button type="submit" size="sm" disabled={status === 'loading'}>
            {status === 'loading' ? '...' : 'Abone Ol'}
          </Button>
        </form>
      )}
      {status === 'error' && (
        <p className="text-xs text-red-500 mt-1">Bir hata oluştu.</p>
      )}
    </div>
  )
}
