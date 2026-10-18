import { profile } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <a href="#home" className="footer__word" aria-label="Back to top">
          {profile.name}
          <span>.</span>
        </a>
        <div className="footer__bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}. Written with care.
          </p>
          <div className="footer__links">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                {s.label}
              </a>
            ))}
          </div>
          <a href="#home" className="footer__top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
