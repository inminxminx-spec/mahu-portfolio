import { useEffect, useRef, useState } from 'react'
import { profile } from '../data.js'

const links = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#testimonials', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

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

  return (
    <>
      <header
        className={`nav ${scrolled ? 'nav--scrolled' : ''} ${hidden && !open ? 'nav--hidden' : ''} ${open ? 'nav--open' : ''}`}
      >
        <div className="container nav__inner">
          <a href="#home" className="nav__logo" onClick={close}>
            {profile.name}
            <span>.</span>
          </a>

          <nav className="nav__links">
            {links.map((l, i) => (
              <a key={l.href} href={l.href}>
                <sup>0{i + 1}</sup>
                {l.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="nav__status">
            <span className="dot" />
            {profile.availability}
          </a>

          <button className="nav__toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      <div className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open}>
        <nav className="container menu__links">
          {links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={close} style={{ '--i': i }}>
              <sup>0{i + 1}</sup>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="container menu__foot">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </>
  )
}
