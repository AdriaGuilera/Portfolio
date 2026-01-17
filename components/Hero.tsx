'use client'

import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.8])

  useEffect(() => {
    if (prefersReducedMotion) return
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
        delayChildren: prefersReducedMotion ? 0 : 0.2,
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

  const imageVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 0.8, opacity: 0, rotate: prefersReducedMotion ? 0 : -5 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 1,
        ease: [0.25, 0.4, 0.25, 1],
        delay: prefersReducedMotion ? 0 : 0.5,
      },
    },
  }

  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" ref={ref} className="min-h-screen flex items-center justify-center section-padding relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Animated background lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {!prefersReducedMotion && [...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-border"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.3 }}
            transition={{ duration: 1.5, delay: i * 0.2, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Floating geometric shapes - hidden when reduced motion preferred */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-[10%] w-32 h-32 border border-border opacity-20"
            aria-hidden="true"
            animate={{
              x: mousePosition.x * 0.5,
              y: mousePosition.y * 0.5,
              rotate: [0, 90, 180, 270, 360],
            }}
            transition={{
              x: { duration: 0.3 },
              y: { duration: 0.3 },
              rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-[10%] w-48 h-48 border border-border rounded-full opacity-10"
            aria-hidden="true"
            animate={{
              x: -mousePosition.x * 0.3,
              y: -mousePosition.y * 0.3,
              scale: [1, 1.1, 1],
            }}
            transition={{
              x: { duration: 0.3 },
              y: { duration: 0.3 },
              scale: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </>
      )}

      <motion.div
        style={{ y, opacity, scale }}
        className="container-width z-10"
      >
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left: Text Content */}
          <div className="order-2 lg:order-1">
            {/* Greeting */}
            <motion.p
              className="text-sm uppercase tracking-[0.3em] text-textSecondary mb-6"
              variants={itemVariants}
            >
              Hello, I'm
            </motion.p>

            {/* Name */}
            <motion.h1 id="hero-heading" className="heading-1 mb-6" variants={itemVariants}>
              Adrià Guilera
            </motion.h1>

            {/* Title/Role */}
            <motion.p
              className="text-xl md:text-2xl font-light text-textSecondary tracking-wide mb-8"
              variants={itemVariants}
            >
              Junior Developer & AI Enthusiast
            </motion.p>

            {/* Description */}
            <motion.p
              className="body-text max-w-lg mb-10"
              variants={itemVariants}
            >
              Building AI-powered solutions and full-stack applications.
              Exploring the intersection of software engineering and artificial intelligence.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={scrollToContact}
                className="minimal-button min-h-[44px] min-w-[44px]"
                whileHover={prefersReducedMotion ? {} : { scale: 1.05, x: 5 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                aria-label="Navigate to contact section"
              >
                Get in Touch
              </motion.button>
            </motion.div>
          </div>

          {/* Right: 3D Figure Image */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            variants={imageVariants}
          >
            <motion.div
              className="relative w-72 h-72 md:w-96 md:h-96"
              animate={prefersReducedMotion ? {} : {
                y: [0, -15, 0],
              }}
              transition={prefersReducedMotion ? {} : {
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="absolute inset-0"
                animate={prefersReducedMotion ? {} : {
                  x: mousePosition.x * 0.1,
                  y: mousePosition.y * 0.1,
                }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src="/media/Saludo.jpg"
                  alt="Adrià Guilera waving hello"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 288px, 384px"
                />
              </motion.div>
              
              {/* Decorative elements around image */}
              {!prefersReducedMotion && (
                <motion.div
                  className="absolute -inset-4 border border-border opacity-30"
                  aria-hidden="true"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            aria-hidden="true"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-6 h-10 border border-border rounded-full flex items-start justify-center p-2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-2 bg-text rounded-full"
              />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
