'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { SearchBar } from './search-bar'
import { BarChart3, User, LogOut, Newspaper } from 'lucide-react'

export function Navbar() {
  const { data: session } = useSession()
  const today = new Date().toLocaleDateString('tr-TR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="sticky top-0 z-50">
      {/* Top Bar - ÇözümPark tarzı mavi üst çubuk */}
      <div className="bg-[#3b5998] text-[#f6f7f9] text-xs">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-4 h-8">
          <span className="hidden sm:block">{today}</span>
          <div className="flex items-center gap-3">
            {session ? (
              <>
                <Link href="/profil" className="hover:text-white transition-colors">
                  <span className="hidden sm:inline">Merhaba, {session.user?.name || session.user?.email}</span>
                  <User className="sm:hidden w-3.5 h-3.5" />
                </Link>
                <button onClick={() => signOut()} className="hover:text-white transition-colors">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/giris" className="hover:text-white transition-colors">Giriş</Link>
                <Link href="/auth/kayit" className="hover:text-white transition-colors">Kayıt</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav - ÇözümPark tarzı koyu navbar */}
      <nav className="bg-[#1f2024] text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl flex items-center h-14 px-4 gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <BarChart3 className="w-6 h-6 text-[#3b5998]" />
            <span className="text-lg font-bold tracking-tight">RegNews</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="nav-link text-white/80 hover:text-white">
              Ana Sayfa
            </Link>
            <Link href="/kategori/TEKNOLOJI" className="nav-link text-white/80 hover:text-white">
              Teknoloji
            </Link>
            <Link href="/ara" className="nav-link text-white/80 hover:text-white">
              Haberler
            </Link>
          </div>

          <div className="flex-1 max-w-sm ml-auto">
            <SearchBar />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <Link href="/ara" className="p-2 text-white/80 hover:text-white">
              <Newspaper className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
