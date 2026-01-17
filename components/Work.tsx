'use client'

import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import Skills from './Skills'
import { section } from 'framer-motion/m'

export default function Work() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const figureY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [150, -150])
  const figureRotate = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [-10, 10])

  const projects = [
    {
      title: 'Junior FullStack Developer',
      company: 'K·Factor Technologies',
      category: 'Full-Stack & AI Development',
      description: 'Built multi-tenant AI agents using Python and LangChain ecosystem. Developed and maintained Nest.js backends and Flutter mobile apps. Implemented RAG systems and SQL agents for intelligent document retrieval and database querying using LLMs.',
      tech: ['Python', 'LangChain', 'Nest.js', 'Flutter', 'RAG', 'SQL Agents'],
      year: 'Feb 2024 – Present',
    },
    {
      title: 'Livea - AI Ticketing System',
      company: 'Personal Project',
      category: 'AI Development',
      description: 'Building an AI-powered ticketing system for real estate managers with WhatsApp integration. Automating customer service and making property management more efficient.',
      tech: ['Python', 'LangChain', 'WhatsApp API', 'AI Agents'],
      year: 'Dec 2025 – Present',
    },
    {
      title: 'AI Consulting for SMEs',
      company: 'Freelance',
      category: 'AI Integration & Consulting',
      description: 'Consulting for small and medium companies to integrate AI into workflows. Built HR chatbot on Microsoft Teams with RAG architecture. Developed email management platform with AI-powered sorting. Created document extraction pipeline reducing manual entry by 70%.',
      tech: ['Python', 'RAG', 'Microsoft Teams', 'LLMs', 'Document AI'],
      year: 'Feb 2025 – Present',
    },
    {
      title: 'Software Engineering Degree',
      company: 'FIB UPC',
      category: 'Education',
      description: 'Major in Software Engineering covering development, maintenance, and evaluation of software systems. Mastered algorithmic problem-solving, data structures, design patterns, distributed systems, and multiplatform applications. Applied agile methodologies and ethical considerations.',
      tech: ['C++', 'Python', 'TypeScript', 'Algorithms', 'Design Patterns', 'Agile'],
      year: 'Sept 2022 – June 2026',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: prefersReducedMotion ? 0 : 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  return (
    <section id="work" className="section-padding overflow-hidden scroll-mt-20" ref={containerRef} aria-labelledby="work-heading">
      <motion.div
        className="container-width"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        ref={ref}
      >
        {/* Section Title with floating figure */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-20 gap-8">
          <motion.div variants={itemVariants}>
            <h2 id="work-heading" className="heading-2 mb-4">Selected Work</h2>
            <motion.div 
              className="w-20 h-px bg-text"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
              style={{ originX: 0 }}
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8" role="list" aria-label="Project showcase">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              className="minimal-card group cursor-pointer relative overflow-hidden focus-within:ring-2 focus-within:ring-text focus-within:ring-offset-2"
              whileHover={prefersReducedMotion ? {} : { y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              role="listitem"
              tabIndex={0}
              aria-label={`${project.title} - ${project.category}, ${project.year}`}
            >
              {/* Animated background on hover */}
              <motion.div
                className="absolute inset-0 bg-surface"
                initial={{ x: '-100%' }}
                animate={{ x: hoveredIndex === index ? '0%' : '-100%' }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                aria-hidden="true"
              />
              
              <div className="relative z-10">
                {/* Year */}
                <motion.div
                  className="text-xs uppercase tracking-widest text-textSecondary mb-4"
                  animate={{ x: prefersReducedMotion ? 0 : (hoveredIndex === index ? 5 : 0) }}
                  transition={{ duration: 0.3 }}
                >
                  {project.year}
                </motion.div>

                {/* Title */}
                <h3 className="text-2xl font-light mb-2">{project.title}</h3>

                {/* Company */}
                <div className="text-sm text-text font-medium mb-2">
                  {project.company}
                </div>

                {/* Category */}
                <div className="text-sm text-textSecondary uppercase tracking-wide mb-4">
                  {project.category}
                </div>

                {/* Description */}
                <p className="body-text mb-6 text-sm">{project.description}</p>

                {/* Tech Stack */}
                <ul className="flex flex-wrap gap-2 mb-4" aria-label="Technologies used">
                  {project.tech.map((tech) => (
                    <motion.li
                      key={tech}
                      className="text-xs px-3 py-1 border border-border uppercase tracking-wide"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, borderColor: '#000' }}
                    >
                      {tech}
                    </motion.li>
                  ))}
                </ul>

                {/* Hover Arrow */}
                <motion.div
                  className="flex items-center text-sm uppercase tracking-wide mt-4"
                  initial={{ x: 0 }}
                  animate={{ x: prefersReducedMotion ? 0 : (hoveredIndex === index ? 10 : 0) }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mr-2">View Project</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>
        <div className="mt-20 pt-12 border-t border-border">
          <Skills/>
        </div>
      </motion.div>
    </section>
  )
}
