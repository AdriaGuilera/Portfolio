import type { Metadata } from 'next'
import Org from '@/components/Org'
import Page from '@/components/Page'
import { jobs } from '@/lib/content'

export const metadata: Metadata = { title: 'Work' }

export default function Work() {
  return (
    <Page heading="Where I have worked">
      {jobs.map((job) => (
        <article className="item" key={job.title}>
          <div className="when">{job.period}</div>
          <div>
            <h2>{job.title}</h2>
            {job.org && <Org name={job.org} url={job.url} />}
            {job.description && <p>{job.description}</p>}
          </div>
        </article>
      ))}
    </Page>
  )
}
