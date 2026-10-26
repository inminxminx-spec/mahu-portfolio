import { Link } from 'react-router-dom'
import { profile } from '../data.js'

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <Link to="/" className="footer__word" aria-label="Home">
          {profile.name}
          <span>.</span>
        </Link>
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
          <button onClick={toTop} className="footer__top">
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
