'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const prefersReducedMotion = useReducedMotion()

  return (
    <footer className="border-t border-border bg-surface" role="contentinfo">
      <div className="container-width py-8">
        <div className="flex justify-between items-center">
          {/* Copyright */}
          <div className="text-sm text-textSecondary">
            © {currentYear} Adrià Guilera Bernabé
          </div>

          {/* Back to Top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
            className="text-sm uppercase tracking-wide text-textSecondary hover:text-text transition-colors flex items-center gap-2 min-h-[44px] px-2 focus-visible:ring-2 focus-visible:ring-text focus-visible:ring-offset-2 focus-visible:outline-none"
            aria-label="Scroll back to top of page"
          >
            Back to Top
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
              <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  )
}
