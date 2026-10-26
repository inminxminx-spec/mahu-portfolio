import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { profile } from '../data.js'
import { blogEnabled } from '../wordpress.js'

const links = [
  { to: '/#about', label: 'About' },
  { to: '/#services', label: 'Services' },
  { to: '/#work', label: 'Work' },
  ...(blogEnabled ? [{ to: '/blog', label: 'Blog' }] : []),
  { to: '/#testimonials', label: 'Reviews' },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { pathname } = useLocation()

  // background after scrolling a bit; hide when scrolling down, show when scrolling up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setHidden(y > 300 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const close = () => setOpen(false)
  const isActive = (to) => to === '/blog' && pathname.startsWith('/blog')

  return (
    <>
      <header
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${hidden && !open ? 'nav--hidden' : ''} ${open ? 'nav--open' : ''}`}
      >
        <div className="container nav__inner">
          <Link to="/" className="nav__logo" onClick={close}>
            {profile.name}
            <span>.</span>
          </Link>

          <nav className="nav__links">
            {links.map((l, i) => (
              <Link key={l.to} to={l.to} className={isActive(l.to) ? 'is-active' : ''}>
                <sup>0{i + 1}</sup>
                {l.label}
              </Link>
            ))}
          </nav>

          <Link to="/#contact" className="nav__status">
            <span className="dot" />
            {profile.availability}
          </Link>

          <button className="nav__toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open}>
        <nav className="container menu__links">
          {links.map((l, i) => (
            <Link key={l.to} to={l.to} onClick={close} style={{ '--i': i }}>
              <sup>0{i + 1}</sup>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="container menu__foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </>
  )
}
