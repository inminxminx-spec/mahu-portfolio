import { about } from '../data.js'
import { CountUp, Reveal, SectionHead } from './ui.jsx'

const isNumber = (value) => /^\d/.test(value)

export default function About() {
  const lines = about.headline
  const last = lines.length - 1

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead
          num="01"
          label="About"
          title={lines.map((line, i) => (
            <span key={line}>
              {i === last ? <em>{line}</em> : line}
              {i < last && <br />}
            </span>
          ))}
        />

        <div className="about">
          <Reveal className="about__body">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          <div>
            <Reveal as="blockquote" delay={150} className="pull">
              {about.quote}
              {about.quoteAuthor && <cite>— {about.quoteAuthor}</cite>}
            </Reveal>
            <Reveal delay={250} className="stats">
              {about.stats.map((s) => (
                <div key={s.label} className={`stat ${isNumber(s.value) ? '' : 'stat--text'}`}>
                  <strong>{isNumber(s.value) ? <CountUp value={s.value} /> : s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
