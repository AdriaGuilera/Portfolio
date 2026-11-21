import type { ReactNode } from 'react'

type Props = { heading: string; lede?: string; children?: ReactNode }

export default function Page({ heading, lede, children }: Props) {
  return (
    <main className="page" id="main">
      <h1>{heading}</h1>
      {lede && <p className="lede">{lede}</p>}
      {children}
    </main>
  )
}
