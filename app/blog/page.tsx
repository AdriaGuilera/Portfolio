import type { Metadata } from 'next'
import Page from '@/components/Page'

export const metadata: Metadata = { title: 'Blog' }

export default function Blog() {
  return <Page heading="Coming soon" />
}
