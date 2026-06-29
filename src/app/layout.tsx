import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/navbar'

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin', 'latin-ext'],
})

export const metadata: Metadata = {
  title: 'RegNews - Regülasyon ve Teknoloji Haberleri',
  description: 'KVKK, GDPR, NIST, SPK, BTK, ISO27001 ve teknoloji haberleri tek ekranda.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={roboto.className}>
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-7xl px-4 py-6">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
