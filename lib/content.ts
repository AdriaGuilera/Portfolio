export const CV_HREF = '/Adrià_Guilera_Bernabé_CV.pdf'

export const profile = {
  name: 'Adrià Guilera',
  fullName: 'Adrià Guilera Bernabé',
  role: 'AI Software Engineer, Barcelona',
  lede: 'I make AI take care of the boring stuff, so humans can focus on what really matters.',
}

export const pages = [
  { id: 'work', href: '/work', label: 'work' },
  { id: 'projects', href: '/projects', label: 'projects' },
  { id: 'blog', href: '/blog', label: 'blog' },
  { id: 'contact', href: '/contact', label: 'contact' },
] as const

export const cv = { href: CV_HREF, label: 'cv' }

export type PageId = (typeof pages)[number]['id']

type Job = { period: string; title: string; org?: string; url?: string; description?: string }

export const jobs: Job[] = [
  {
    period: 'Apr 2026 - Present',
    title: 'AI Software Engineer',
    org: 'Spoki',
    url: 'https://spoki.com',
    description:
      'Building the voice and WhatsApp AI agents at Spoki, a conversational platform for businesses, and everything around them.',
  },
  {
    period: 'Feb 2025 - Apr 2026',
    title: 'Junior FullStack Developer',
    org: 'K·Factor Technologies',
    description:
      'Brought AI into the company from zero and owned it end to end, building its first AI agents alongside the backends and mobile apps.',
  },
  {
    period: 'Feb 2025 - Apr 2026',
    title: 'AI Consulting for SMEs',
    org: 'Freelance',
    description:
      'Helping small and medium companies put AI into their everyday work, from an HR chatbot to email sorting and document extraction.',
  },
  {
    period: 'June 2022 - Jan 2025',
    title: 'Waiter & Bar Manager',
  },
]

export const projects = [
  {
    title: 'Livea',
    status: 'Soon',
    description:
      'Helping real estate developers sell homes, with AI that runs the whole buyer journey from first enquiry to after-sales.',
  },
]

export const contact = {
  lede: 'Open to AI engineering work and interesting problems. The fastest way to reach me is email.',
  links: [
    { net: 'Email', value: 'adriaguilera7@gmail.com', href: 'mailto:adriaguilera7@gmail.com', external: false },
    { net: 'LinkedIn', value: '/in/adria-guilera', href: 'https://www.linkedin.com/in/adria-guilera', external: true },
    { net: 'GitHub', value: '/AdriaGuilera', href: 'https://github.com/AdriaGuilera', external: true },
  ],
}
