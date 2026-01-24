'use client'

import { motion, useInView, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const prefersReducedMotion = useReducedMotion()
  
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })
  
  const leftFigureY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [100, -100])
  const rightFigureY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [50, -150])

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
    hidden: { y: prefersReducedMotion ? 0 : 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  }

  const socials = [
    {
      label: 'Email',
      value: 'adriaguilera7@gmail.com',
      href: 'mailto:adriaguilera7@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: 'LinkedIn',
      value: '/in/adria.guilera',
      href: 'https://linkedin.com/in/adria.guilera',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: '/AdriaGuilera',
      href: 'https://github.com/AdriaGuilera',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className="py-16 bg-surface overflow-hidden" ref={containerRef} aria-labelledby="contact-heading">
      <motion.div
        className="container-width"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        ref={ref}
      >
        <div className="relative">
          {/* Content */}
          <div className="text-center max-w-2xl mx-auto">
            {/* Section Title */}
            <motion.div variants={itemVariants} className="mb-2">
              <h2 id="contact-heading" className="heading-3 mb-4">Let's Connect</h2>
              <motion.div 
                className="w-16 h-px bg-text mx-auto"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: prefersReducedMotion ? 0 : 0.3 }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Social Links */}
            <motion.nav 
              className="flex flex-wrap justify-center gap-4"
              variants={itemVariants}
              aria-label="Social media links"
            >
              {socials.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={social.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className="group px-8 py-6 border border-border hover:border-text bg-background transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:outline-none"
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: prefersReducedMotion ? 0 : (0.4 + index * 0.1), duration: prefersReducedMotion ? 0.01 : 0.5 }}
                  whileHover={prefersReducedMotion ? {} : { y: -5, scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  aria-label={`${social.label}: ${social.value}`}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="text-textSecondary group-hover:text-text transition-colors">
                      {social.icon}
                    </div>
                    <div className="text-xs uppercase tracking-widest whitespace-nowrap">{social.label}</div>
                  </div>
                </motion.a>
              ))}
            </motion.nav>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
