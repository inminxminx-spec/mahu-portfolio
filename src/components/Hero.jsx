import { profile } from '../data.js'

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
  const [first, middle, last] = profile.headline

  return (
    <section id="home" className="hero">
      <div className="container hero__inner">
        <div className="masthead">
          {profile.masthead.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <h1 className="hero__title">
          <span className="hero__line">
            <span>{first}</span>
          </span>
          <span className="hero__line">
            <span>
              <em>{middle}</em>
            </span>
          </span>
          <span className="hero__line">
            <span>
              {last}
              <span className="hero__note">{profile.headlineNote}</span>
            </span>
          </span>
        </h1>
        <p className="hero__aside">{profile.headlineAside}</p>

        <div className="hero__bottom">
          <div className="hero__intro">
            <p>
              <Highlighted text={profile.intro} phrase={profile.highlight} />
            </p>
            <div className="hero__actions">
              <a href="#about" className="btn">
                <span>Explore my approach</span>
                <i>↘</i>
              </a>
              <a href="#contact" className="btn btn--line">
                <span>Book a reading</span>
              </a>
              {profile.resume && (
                <a href={profile.resume} className="text-link" download>
                  Download CV
                </a>
              )}
            </div>
          </div>

          <a href="#contact" className="badge" aria-label="Book a reading">
            <svg viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#badge-circle" textLength="488" lengthAdjust="spacing">
                  {profile.badge}
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
