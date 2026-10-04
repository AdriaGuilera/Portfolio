export default function Contact() {
  return (
    <section className="section wrap" id="contact" aria-labelledby="contact-title">
      <div className="section__head">
        <h2 className="section__title" id="contact-title">Get in touch</h2>
        <p className="contact__lede">Open to AI engineering work and interesting problems. The fastest way to reach me is email.</p>
      </div>
      <ul className="contact__list">
        <li>
          <a className="contact__row" href="mailto:adriaguilera7@gmail.com">
            <span className="contact__net">Email</span>
            <span className="contact__val">adriaguilera7@gmail.com</span>
            <span className="contact__arrow" aria-hidden="true">&#8599;</span>
          </a>
        </li>
        <li>
          <a className="contact__row" href="https://www.linkedin.com/in/adri%C3%A0-guilera-2555881a8/" target="_blank" rel="noopener noreferrer">
            <span className="contact__net">LinkedIn</span>
            <span className="contact__val">/in/adria.guilera</span>
            <span className="contact__arrow" aria-hidden="true">&#8599;</span>
          </a>
        </li>
        <li>
          <a className="contact__row" href="https://github.com/AdriaGuilera" target="_blank" rel="noopener noreferrer">
            <span className="contact__net">GitHub</span>
            <span className="contact__val">/AdriaGuilera</span>
            <span className="contact__arrow" aria-hidden="true">&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  )
}
