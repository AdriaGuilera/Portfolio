const CV_HREF = '/Adrià_Guilera_Bernabé_CV.pdf'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__inner">
          <span className="footer__copy">© <span data-year>2026</span> Adrià Guilera Bernabé</span>
          <div className="footer__links">
            <a href={CV_HREF} download>Download CV</a>
            <button type="button" data-top>Back to top</button>
          </div>
        </div>
      </div>
    </footer>
  )
}
