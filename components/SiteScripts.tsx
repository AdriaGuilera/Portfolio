'use client'

import { useEffect } from 'react'
import Script from 'next/script'

type GsapLike = {
  registerPlugin: (plugin: unknown) => void
  from: (target: unknown, vars: Record<string, unknown>) => void
  fromTo: (
    target: unknown,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>
  ) => void
  utils: { toArray: (target: unknown) => Element[] }
}

type ScrollTriggerLike = {
  batch: (target: string, vars: Record<string, unknown>) => void
}

type GsapWindow = Window & { gsap?: GsapLike; ScrollTrigger?: ScrollTriggerLike }

export default function SiteScripts() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = document.documentElement

    // Browser chrome details owned by the design, not the UA defaults.
    doc.style.scrollbarColor = '#0a0a0a #ffffff'
    if (reduce) doc.classList.add('no-motion')

    // Real year
    const yearEl = document.querySelector('[data-year]')
    if (yearEl) yearEl.textContent = String(new Date().getFullYear())

    // Back to top
    const top = document.querySelector('[data-top]')
    const onTop = () => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
    top?.addEventListener('click', onTop)

    if (reduce) {
      return () => top?.removeEventListener('click', onTop)
    }

    // About figurine: cycle the set on one raster (others preloaded).
    const startCycling = () => {
      const cycImg = document.querySelector<HTMLImageElement>('[data-cycle] img')
      if (!cycImg) return
      const frames = [
        '/media/studying.png',
        '/media/coding2.png',
        '/media/lifting.png',
        '/media/fishing.png',
      ]
      const alts = [
        'Figurine of Adrià studying',
        'Figurine of Adrià coding at a desk',
        'Figurine of Adrià bench pressing',
        'Figurine of Adrià fishing',
      ]
      frames.forEach((src) => {
        const pre = new Image()
        pre.src = src
      })
      let idx = 0
      window.setInterval(() => {
        cycImg.style.opacity = '0'
        window.setTimeout(() => {
          idx = (idx + 1) % frames.length
          cycImg.src = frames[idx]
          cycImg.alt = alts[idx]
          cycImg.style.opacity = '1'
        }, 420)
      }, 2800)
    }

    const runAnimations = () => {
      const w = window as GsapWindow
      const g = w.gsap
      const ScrollTrigger = w.ScrollTrigger
      if (!g || !ScrollTrigger) return

      try {
        g.registerPlugin(ScrollTrigger)
      } catch {
        return
      }

      // 1. Hero line masks - precise mechanical rise out of the mask.
      g.from('.hero__title .mask__line', {
        yPercent: 108,
        duration: 1.05,
        ease: 'power4.out',
        stagger: 0.09,
      })

      // 2. Nav and hero support elements: linear staggered entrance.
      g.from('.nav__inner > *', {
        autoAlpha: 0,
        y: -8,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.06,
        delay: 0.1,
      })
      g.from('.hero__body > *', {
        autoAlpha: 0,
        y: 18,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.35,
      })
      g.from('.hero__fig', {
        autoAlpha: 0,
        y: 24,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.5,
      })

      // 3. Section headings: line-mask style reveal.
      g.utils.toArray('.section__title').forEach((el) => {
        g.from(el, {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.8,
          ease: 'power4.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        })
      })

      // 4. Generic staggered reveals for content blocks.
      ScrollTrigger.batch('.about__text p, .contact__lede, .contact__row, .work__panel', {
        start: 'top 88%',
        once: true,
        onEnter: (els: Element[]) => {
          g.from(els, {
            autoAlpha: 0,
            y: 22,
            duration: 0.6,
            ease: 'power3.out',
            stagger: 0.05,
          })
        },
      })

      // 5. Parallax punctuation: the figurine drifts against the scroll.
      g.utils.toArray('[data-parallax]').forEach((el) => {
        const amt = parseFloat(el.getAttribute('data-parallax') || '') || 0.1
        g.fromTo(
          el,
          { yPercent: amt * 100 * -0.5 },
          {
            yPercent: amt * 100 * 0.5,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      })

      // 6. About figurine cycle.
      startCycling()
    }

    // GSAP is loaded from the CDN via next/script; wait until it is present.
    let tries = 0
    const timer = window.setInterval(() => {
      const w = window as GsapWindow
      if (w.gsap && w.ScrollTrigger) {
        window.clearInterval(timer)
        runAnimations()
      } else if (++tries > 250) {
        window.clearInterval(timer)
      }
    }, 60)

    return () => {
      window.clearInterval(timer)
      top?.removeEventListener('click', onTop)
    }
  }, [])

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}
