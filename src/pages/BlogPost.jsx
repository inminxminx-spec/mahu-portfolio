import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { profile } from '../data.js'
import { formatDate, getPost, getPosts } from '../wordpress.js'
import { useSeo } from '../seo.js'
import PostCard from '../components/PostCard.jsx'
import NotFound from './NotFound.jsx'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(undefined) // undefined = loading, null = not found
  const [more, setMore] = useState([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let cancelled = false
    setPost(undefined)
    getPost(slug)
      .then((p) => !cancelled && setPost(p))
      .catch(() => !cancelled && setPost(null))
    getPosts({ perPage: 4 })
      .then((r) => !cancelled && setMore(r.posts.filter((p) => p.slug !== slug).slice(0, 3)))
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [slug])

  useSeo(
    post
      ? { title: post.title, description: post.excerpt.slice(0, 160), path: `/blog/${post.slug}`, image: post.image }
      : { path: `/blog/${slug}` }
  )

  if (post === null) return <NotFound />

  if (post === undefined) {
    return (
      <article className="article">
        <div className="container article__narrow" aria-busy="true">
          <div className="sk sk--short" />
          <div className="sk sk--headline" />
          <div className="sk sk--headline sk--short" />
          <div className="sk article__sk-img" />
        </div>
      </article>
    )
  }

  const url = `https://www.minnxx.com/blog/${post.slug}`
  const share = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${post.title} ${url}`)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: 'X', href: `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(post.title)}` },
  ]
  const copy = () => {
    navigator.clipboard?.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <article className="article">
      <div className="container article__narrow">
        <Link to="/blog" className="article__back">
          ← All articles
        </Link>

        <div className="article__cats">
          {post.categories.map((c) => (
            <span key={c.id}>{c.name}</span>
          ))}
        </div>

        <h1 className="article__title">{post.title}</h1>

        <div className="article__meta">
          <span className="article__avatar">{profile.photo ? <img src={profile.photo} alt="" /> : profile.name[0]}</span>
          <span>
            By <strong>{profile.name}</strong>
          </span>
          <span>·</span>
          <time dateTime={post.date.toISOString()}>{formatDate(post.date)}</time>
          <span>·</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>

      {post.image && (
        <div className="container article__cover">
          <img src={post.image} alt={post.imageAlt || post.title} />
        </div>
      )}

      <div className="container article__narrow">
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="article__share">
          <span>Share this</span>
          {share.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
          <button onClick={copy}>{copied ? 'Copied ✓' : 'Copy link'}</button>
        </div>

        <aside className="author-box">
          <span className="author-box__avatar">
            {profile.photo ? <img src={profile.photo} alt={profile.name} /> : profile.name[0]}
          </span>
          <div>
            <p className="author-box__label">Written by</p>
            <h3>{profile.name}</h3>
            <p>
              {profile.role}. Need content like this for your brand? I'd love to help you tell your story.
            </p>
            <Link to="/#contact" className="text-link">
              Work with me →
            </Link>
          </div>
        </aside>
      </div>

      {more.length > 0 && (
        <div className="container article__more">
          <div className="shead__meta">
            <span>✎</span>
            <span className="shead__rule" />
            <span>Keep reading</span>
          </div>
          <div className="posts-grid">
            {more.map((p, i) => (
              <PostCard key={p.id} post={p} index={i + 1} delay={i * 100} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
