import { services } from '../data.js'
import { Reveal, SectionHead } from './ui.jsx'

export default function Services() {
  return (
    <section id="services" className="section section--tight-top">
      <div className="container">
        <SectionHead
          num="02"
          label="Services"
          title={
            <>
              What I can <em>write</em> for you
            </>
          }
        />

        <div className="svc">
          {services.map((s, i) => (
            <Reveal as="a" href="#contact" key={s.title} delay={i * 60} className="svc__row">
              <span className="svc__num">({String(i + 1).padStart(2, '0')})</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="svc__arrow">↗</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
