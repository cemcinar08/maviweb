'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { SearchBar } from './search-bar'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4">
        <Link href="/" className="text-lg font-bold text-primary shrink-0">
          RegNews
        </Link>

        <div className="hidden md:flex items-center gap-1 text-sm">
          <Link href="/" className="px-3 py-1.5 rounded-md hover:bg-muted transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/kategori/TEKNOLOJI" className="px-3 py-1.5 rounded-md hover:bg-muted transition-colors">
            Teknoloji
          </Link>
        </div>

        <div className="flex-1 max-w-md mx-auto">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {session ? (
            <>
              <Link href="/profil" className="text-sm text-muted-foreground hover:text-foreground">
                {session.user?.name || session.user?.email}
              </Link>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>
                Çıkış
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/giris">
                <Button variant="ghost" size="sm">Giriş</Button>
              </Link>
              <Link href="/auth/kayit">
                <Button size="sm">Kayıt</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
