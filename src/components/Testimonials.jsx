import { useEffect, useState } from 'react'
import { testimonials } from '../data.js'
import { Reveal, SectionHead } from './ui.jsx'
import { blogEnabled } from '../wordpress.js'

const DURATION = 7000

export default function Testimonials() {
  const [i, setI] = useState(0)
  const n = testimonials.length
  const t = testimonials[i]

  useEffect(() => {
    const timer = setTimeout(() => setI((i + 1) % n), DURATION)
    return () => clearTimeout(timer)
  }, [i, n])

  return (
    <section id="testimonials" className="section process">
      <div className="container">
        <SectionHead
          num={blogEnabled ? '06' : '05'}
          label="Kind Words"
          title={
            <>
              Clients <em>say</em> it best
            </>
          }
        />

        <Reveal className="testi">
          <div className="testi__mark" aria-hidden="true">“</div>
          <div>
            <blockquote key={i} className="testi__quote">
              {t.text}
            </blockquote>

            <div className="testi__foot">
              <div className="testi__author" key={`a${i}`}>
                <span className="testi__avatar">{t.name[0]}</span>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>

              <div className="testi__ctrl">
                <span className="testi__count">
                  {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                </span>
                <button onClick={() => setI((i - 1 + n) % n)} aria-label="Previous review">←</button>
                <button onClick={() => setI((i + 1) % n)} aria-label="Next review">→</button>
              </div>
            </div>
            <div className="testi__bar">
              <span key={i} style={{ animationDuration: `${DURATION}ms` }} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
