import { about } from '../data.js'
import { CountUp, Reveal, SectionHead } from './ui.jsx'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead
          num="01"
          label="About"
          title={
            <>
              A storyteller for brands that want to be <em>heard.</em>
            </>
          }
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
            </Reveal>
            <Reveal delay={250} className="stats">
              {about.stats.map((s) => (
                <div key={s.label} className="stat">
                  <strong>
                    <CountUp value={s.value} />
                  </strong>
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
