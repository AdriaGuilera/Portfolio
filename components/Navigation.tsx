'use client'

import { useState } from 'react'

const CV_HREF = '/Adrià_Guilera_Bernabé_CV.pdf'

export default function Navigation() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="wrap">
        <div className="nav__inner">
          <a className="nav__brand" href="#home" aria-label="Adrià Guilera Bernabé, back to top">
            <span className="nav__mark" aria-hidden="true"></span>
            Adrià Guilera Bernabé
          </a>
          <nav className="nav__links" aria-label="Primary">
            <a className="nav__link" href="#home">Home</a>
            <a className="nav__link" href="#about">About</a>
            <a className="nav__link" href="#work">Work</a>
            <a className="nav__link" href="#contact">Contact</a>
            <a className="nav__cv" href={CV_HREF} download>Download CV</a>
          </nav>
          <button
            className="nav__toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
        <div
          className={open ? 'nav__menu is-open' : 'nav__menu'}
          id="mobile-menu"
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('a')) setOpen(false)
          }}
        >
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
          <a href={CV_HREF} download>Download CV</a>
        </div>
      </div>
    </header>
  )
}
