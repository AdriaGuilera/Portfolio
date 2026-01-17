'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detect active section
      const sections = ['home', 'about', 'work', 'contact']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const navHeight = 80 // Approximate navigation height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'work', label: 'Work' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <motion.nav
      initial={{ y: prefersReducedMotion ? 0 : -100 }}
      animate={{ y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-width px-6 md:px-12 lg:px-24 py-3">
        <div className="flex items-center justify-center">
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm font-normal tracking-wide uppercase transition-colors min-h-[44px] px-2 flex items-center focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:outline-none"
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                <span className={activeSection === item.id ? 'text-text' : 'text-textSecondary hover:text-text'}>
                  {item.label}
                </span>
                <AnimatePresence>
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-text"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      aria-hidden="true"
                    />
                  )}
                </AnimatePresence>
              </button>
            ))}
            
            {/* Download CV Button */}
            <motion.a
              href="/Adrià_Guilera_Bernabé_CV.pdf"
              download
              className="ml-4 px-4 py-2 border border-border hover:border-text hover:bg-surface transition-colors duration-300 text-xs tracking-wide uppercase min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:outline-none"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
              aria-label="Download CV as PDF"
            >
              Download CV
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <MobileMenu navItems={navItems} activeSection={activeSection} scrollToSection={scrollToSection} prefersReducedMotion={prefersReducedMotion} />
        </div>
      </div>
    </motion.nav>
  )
}

function MobileMenu({ navItems, activeSection, scrollToSection, prefersReducedMotion }: { navItems: {id: string, label: string}[], activeSection: string, scrollToSection: (id: string) => void, prefersReducedMotion: boolean | null }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-text focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -20 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg"
            role="menu"
          >
            <div className="flex flex-col py-4">
              {navItems.map((item: { id: string; label: string }) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id)
                    setIsOpen(false)
                  }}
                  className={`px-6 py-3 text-left text-sm uppercase tracking-wide transition-colors min-h-[44px] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text focus-visible:outline-none ${
                    activeSection === item.id ? 'text-text bg-surface' : 'text-textSecondary hover:text-text hover:bg-surface'
                  }`}
                  role="menuitem"
                  aria-current={activeSection === item.id ? 'page' : undefined}
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/Adrià_Guilera_Bernabé_CV.pdf"
                download
                className="px-6 py-3 text-left text-sm uppercase tracking-wide text-textSecondary hover:text-text hover:bg-surface transition-colors border-t border-border mt-2 min-h-[44px] flex items-center focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-text focus-visible:outline-none"
                onClick={() => setIsOpen(false)}
                role="menuitem"
                aria-label="Download CV as PDF"
              >
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
