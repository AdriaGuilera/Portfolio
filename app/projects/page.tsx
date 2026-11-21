import type { Metadata } from 'next'
import Page from '@/components/Page'
import { projects } from '@/lib/content'

export const metadata: Metadata = { title: 'Projects' }

export default function Projects() {
  return (
    <Page heading="Things I have built">
      <ul className="cards">
        {projects.map((project) => (
          <li className="card" key={project.title}>
            <small>{project.status}</small>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </li>
        ))}
      </ul>
    </Page>
  )
}
