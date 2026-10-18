import { process } from '../data.js'
import { Reveal, SectionHead } from './ui.jsx'

export default function Process() {
  return (
    <section className="section process">
      <div className="container">
        <SectionHead
          num="03"
          label="Process"
          title={
            <>
              From blank page to <em>published.</em>
            </>
          }
        />

        <div className="steps">
          {process.map((s, i) => (
            <Reveal key={s.title} delay={i * 120} className="step">
              <div className="step__num">0{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" delay={200} className="hand process__note">
          no ghosting, no missed deadlines — promise ✓
        </Reveal>
      </div>
    </section>
  )
}
