import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import SkipLink from '@/components/SkipLink'

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['300', '400'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Adrià Guilera Bernabé | Portfolio',
  description: 'Personal portfolio of Adrià Guilera Bernabé - Developer & Creator',
}

export const viewport: Viewport = {
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SkipLink />
        <Navigation />
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
