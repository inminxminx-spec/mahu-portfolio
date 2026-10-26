import { Link } from 'react-router-dom'
import { formatDate } from '../wordpress.js'
import { Reveal } from './ui.jsx'

const tones = ['red', 'yellow', 'sage', 'sky', 'ink']

export default function PostCard({ post, index = 0, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <Link to={`/blog/${post.slug}`} className="post-card" data-cursor="Read">
        <div className={`post-card__img tone-${tones[index % tones.length]}`}>
          {post.image ? (
            <img src={post.image} alt={post.imageAlt || post.title} loading="lazy" />
          ) : (
            <span>{post.title[0]}</span>
          )}
        </div>
        <div className="post-card__meta">
          {post.categories[0] && <span className="post-card__cat">{post.categories[0].name}</span>}
          <span>{post.readTime} min read</span>
        </div>
        <h3>
          <span>{post.title}</span>
        </h3>
        <p>{post.excerpt}</p>
        <span className="post-card__date">{formatDate(post.date)}</span>
      </Link>
    </Reveal>
  )
}

export function PostCardSkeleton() {
  return (
    <div className="post-card post-card--skeleton" aria-hidden="true">
      <div className="post-card__img" />
      <div className="sk sk--short" />
      <div className="sk sk--title" />
      <div className="sk" />
      <div className="sk sk--short" />
    </div>
  )
}
