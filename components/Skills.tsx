'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { ReactNode } from 'react'

interface Skill {
  name: string
  icon: ReactNode
}

const skills: Skill[] = [
  {
    name: 'Python',
    icon: (
      <Image
        src="/svgs/python-svgrepo-com.svg"
        alt="Python"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <Image
        src="/svgs/typescript-icon-svgrepo-com.svg"
        alt="TypeScript"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'C++',
    icon: (
      <Image
        src="/svgs/cpp-svgrepo-com.svg"
        alt="C++"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'Dart',
    icon: (
      <Image
        src="/svgs/dartlang-svgrepo-com.svg"
        alt="Dart"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'LangChain',
    icon: (
      <Image
        src="/svgs/Langchain--Streamline-Simple-Icons.svg"
        alt="LangChain"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'Nest.js',
    icon: (
      <Image
        src="/svgs/nest-middleware-js-svgrepo-com.svg"
        alt="Nest.js"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'Flutter',
    icon: (
      <Image
        src="/svgs/flutter-svgrepo-com.svg"
        alt="Flutter"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'Angular',
    icon: (
      <Image
        src="/svgs/angular-svgrepo-com.svg"
        alt="Angular"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'Docker',
    icon: (
      <Image
        src="/svgs/docker-svgrepo-com.svg"
        alt="Docker"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'SQL',
    icon: (
      <Image
        src="/svgs/sql-database-generic-svgrepo-com.svg"
        alt="SQL"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'Git',
    icon: (
      <Image
        src="/svgs/git-svgrepo-com.svg"
        alt="Git"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
  {
    name: 'AI Agents',
    icon: (
      <Image
        src="/svgs/automatic-svgrepo-com.svg"
        alt="AI Agents"
        width={28}
        height={28}
        className="w-7 h-7"
      />
    ),
  },
]

export default function Skills() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div className="relative overflow-hidden py-8">
      {/* Gradient overlays for edge fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
        aria-hidden="true"
      />

      {/* Scrolling container */}
      <div className="flex gap-8" aria-label="Technology skills">
        {/* First set of skills */}
        <motion.div
          className="flex gap-8 shrink-0"
          animate={prefersReducedMotion ? {} : { x: ['0%', '-100%'] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {skills.map((skill) => (
            <div
              key={`${skill.name}-1`}
              className="flex items-center gap-3 px-6 py-4 border border-border bg-surface hover:border-text transition-colors duration-300 shrink-0"
            >
              <span aria-hidden="true">{skill.icon}</span>
              <span className="text-sm font-normal uppercase tracking-wide whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Duplicate set for seamless loop */}
        <motion.div
          className="flex gap-8 shrink-0"
          animate={prefersReducedMotion ? {} : { x: ['0%', '-100%'] }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {skills.map((skill) => (
            <div
              key={`${skill.name}-2`}
              className="flex items-center gap-3 px-6 py-4 border border-border bg-surface hover:border-text transition-colors duration-300 shrink-0"
            >
              <span aria-hidden="true">{skill.icon}</span>
              <span className="text-sm font-normal uppercase tracking-wide whitespace-nowrap">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
