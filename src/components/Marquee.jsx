import { about } from '../data.js'

export default function Marquee() {
  return (
    <div className="marquee" aria-label={about.skills.join(', ')}>
      <div className="marquee__track">
        {[0, 1].map((k) => (
          <div className="marquee__group" key={k} aria-hidden="true">
            {about.skills.map((s) => (
              <span key={s}>
                {s}
                <i>✦</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
