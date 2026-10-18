import { useState } from 'react'
import { samples } from '../data.js'
import { Reveal, SectionHead } from './ui.jsx'

export default function Work() {
  const categories = ['All', ...new Set(samples.map((s) => s.category))]
  const [active, setActive] = useState('All')
  const shown = active === 'All' ? samples : samples.filter((s) => s.category === active)

  return (
    <section id="work" className="section">
      <div className="container">
        <div className="work__head">
          <SectionHead
            num="04"
            label="Selected Work"
            title={
              <>
                Stories I've <em>written</em>
              </>
            }
          />
          <div className="filters">
            {categories.map((c) => (
              <button
                key={c}
                className={`filter ${active === c ? 'filter--active' : ''}`}
                onClick={() => setActive(c)}
              >
                {c}
                <sup>{c === 'All' ? samples.length : samples.filter((s) => s.category === c).length}</sup>
              </button>
            ))}
          </div>
        </div>

        {/* key forces the cards to animate in again when the filter changes */}
        <div className="work__grid" key={active}>
          {shown.map((s, i) => (
            <Reveal
              as="a"
              key={s.title}
              href={s.link}
              target="_blank"
              rel="noreferrer"
              delay={i * 90}
              className={`cover tone-${s.tone}`}
              data-cursor="Read"
            >
              <span className="cover__n">{String(i + 1).padStart(2, '0')}</span>
              <div className="cover__top">
                <span>{s.category}</span>
                <span>{s.readTime}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.excerpt}</p>
              <div className="cover__foot">
                <span>For {s.client}</span>
                <span className="cover__go">↗</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
