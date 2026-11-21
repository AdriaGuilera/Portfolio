import { profile } from '@/lib/content'

export default function Home() {
  return (
    <main className="intro" id="main">
      <h1>{profile.name}</h1>
      <p>{profile.role}</p>
      <p>{profile.lede}</p>
    </main>
  )
}
