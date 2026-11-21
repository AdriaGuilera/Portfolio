import Link from 'next/link'
import { cv, pages, profile, type PageId } from '@/lib/content'

export default function Nav({ current, home }: { current?: PageId; home: boolean }) {
  return (
    <nav className="nav" aria-label="Pages">
      {!home && <Link href="/">{profile.name}</Link>}
      {pages.map((page) => (
        <Link key={page.id} href={page.href} aria-current={page.id === current ? 'page' : undefined}>
          {page.label}
        </Link>
      ))}
      <a href={cv.href} download>
        {cv.label}
      </a>
    </nav>
  )
}
