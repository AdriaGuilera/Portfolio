const CV_HREF = '/Adrià_Guilera_Bernabé_CV.pdf'

export default function Hero() {
  return (
    <section className="hero wrap" id="home" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__head">
          <h1 className="hero__title" id="hero-title">
            <span className="mask"><span className="mask__line">Adrià Guilera</span></span>
            <span className="mask"><span className="mask__line hero__sub">AI Software Engineer, Barcelona</span></span>
          </h1>
        </div>

        <div className="hero__body">
          <p className="hero__lede">I make AI take care of the boring stuff, so humans can focus on what really matters.</p>
          <div className="hero__actions">
            <a className="hero__cta" href="#contact">
              Get in touch
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </a>
            <a className="hero__cv" href={CV_HREF} download>Download CV</a>
          </div>
        </div>

        <figure className="hero__fig" aria-label="Figurine of Adrià waving hello">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/media/saludo_tight.png" alt="Waving figurine of Adrià saying hello" width={392} height={941} />
        </figure>
      </div>
    </section>
  )
}
