import type { Metadata } from 'next'
import Page from '@/components/Page'
import { contact } from '@/lib/content'

export const metadata: Metadata = { title: 'Contact' }

export default function Contact() {
  return (
    <Page heading="Get in touch" lede={contact.lede}>
      <ul className="rows">
        {contact.links.map((link) => (
          <li key={link.net}>
            <a href={link.href} {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
              <span className="k">{link.net}</span>
              <span className="v">{link.value}</span>
              <span className="x" aria-hidden="true">
                &#8599;
              </span>
            </a>
          </li>
        ))}
      </ul>
    </Page>
  )
}
