import { Link } from 'react-router-dom'
import { useSeo } from '../seo.js'

export default function NotFound() {
  useSeo({ title: 'Page not found', path: '/404' })

  return (
    <section className="not-found">
      <div className="container">
        <p className="not-found__code">404</p>
        <h1>
          This page is still a <em>blank draft.</em>
        </h1>
        <p className="hand">nothing written here yet…</p>
        <Link to="/" className="btn">
          <span>Back to home</span>
          <i>→</i>
        </Link>
      </div>
    </section>
  )
}
