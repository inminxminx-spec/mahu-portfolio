import { useEffect, useState } from 'react'
import { profile } from '../data.js'

function useTypewriter(words, { type = 110, erase = 55, hold = 1800 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let t
    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), hold)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex(index + 1)
    } else {
      const next = deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)
      t = setTimeout(() => setText(next), deleting ? erase : type)
    }
    return () => clearTimeout(t)
  }, [text, deleting, index, words, type, erase, hold])

  return text
}

function Highlighted({ text, phrase }) {
  const at = phrase ? text.indexOf(phrase) : -1
  if (at === -1) return text
  return (
    <>
      {text.slice(0, at)}
      <mark className="mark">{phrase}</mark>
      {text.slice(at + phrase.length)}
    </>
  )
}

export default function Hero() {
  const typed = useTypewriter(profile.rotatingWords)

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="masthead">
          <span>Portfolio — Vol. 01</span>
          <span>{profile.role}</span>
          <span>{profile.location} · Est. {profile.since}</span>
        </div>

        <h1 className="hero__title">
          <span className="hero__line">
            <span>
              I write words
              <span className="hero__note">✎ and edit them too</span>
            </span>
          </span>
          <span className="hero__line hero__line--indent">
            <span>
              that <em>{typed}</em>
              <span className="caret" />
            </span>
          </span>
        </h1>

        <div className="hero__bottom">
          <div className="hero__intro">
            <p>
              <Highlighted text={profile.intro} phrase={profile.highlight} />
            </p>
            <div className="hero__actions">
              <a href="#work" className="btn">
                <span>Read my work</span>
                <i>↘</i>
              </a>
              <a href="#contact" className="btn btn--line">
                <span>Let's talk</span>
              </a>
              {profile.resume && (
                <a href={profile.resume} className="text-link" download>
                  Download CV
                </a>
              )}
            </div>
          </div>

          <a href="#contact" className="badge" aria-label="Hire me">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="488" lengthAdjust="spacing">
                  CONTENT WRITER • COPYWRITER • STORYTELLER •
                </textPath>
              </text>
            </svg>
            <span>✎</span>
          </a>

          <div className="hero__photo-wrap">
            <figure className="polaroid" data-cursor="Hi!">
              <span className="tape" />
              <div className="polaroid__img">
                {profile.photo ? <img src={profile.photo} alt={profile.name} /> : <span>{profile.name[0]}</span>}
              </div>
              <figcaption>hi, I'm {profile.name} :)</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}
