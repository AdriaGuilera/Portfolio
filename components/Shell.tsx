'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Nav from '@/components/Nav'
import Pond from '@/components/Pond'
import { pages } from '@/lib/content'

export default function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const home = pathname === '/'
  const current = pages.find((page) => pathname.startsWith(page.href))?.id
  return (
    <div className={home ? 'frame frame--home' : 'frame'}>
      <header className="top">
        <Pond strip={!home} />
        <Nav current={current} home={home} />
      </header>
      {children}
    </div>
  )
}
