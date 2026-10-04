export default function About() {
  return (
    <section className="section wrap" id="about" aria-labelledby="about-title">
      <div className="section__head">
        <h2 className="section__title" id="about-title">About</h2>
      </div>
      <div className="about__body">
        <div className="about__text">
          <p>I&apos;m a passionate AI Software Engineer from Barcelona, with a BS in Software Engineering from FIB UPC.</p>
          <p>These days I work on AI platform assistants, AI text agents and real-time voice agents.</p>
          <p>I&apos;m drawn to startups focused on real-world problems, shipping simple things that work rather than overengineering, and to going deep on AI systems that hold up in production.</p>
          <p>Aside from coding and building, I enjoy going to the gym, spending time with friends and family and going fishing whenever the weather allows it.</p>
        </div>
        <figure className="about__fig" data-parallax="0.12">
          <div className="about__cycle" data-cycle>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/studying.png" alt="Figurine of Adrià studying" width={800} height={800} loading="lazy" />
          </div>
        </figure>
      </div>
    </section>
  )
}
