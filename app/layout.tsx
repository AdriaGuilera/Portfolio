import type { Metadata, Viewport } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import Shell from '@/components/Shell'
import './globals.css'

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata: Metadata = {
  title: { default: 'Adrià Guilera Bernabé | Portfolio', template: '%s | Adrià Guilera' },
  description: 'Personal portfolio of Adrià Guilera Bernabé, AI Software Engineer in Barcelona',
}

export const viewport: Viewport = {
  themeColor: '#0a1719',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={mono.variable}>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
