import { useEffect, useState } from 'react'
import { blog } from '../data.js'
import { getCategories, getPosts } from '../wordpress.js'
import { useSeo } from '../seo.js'
import PostCard, { PostCardSkeleton } from '../components/PostCard.jsx'

const PER_PAGE = 9

export default function BlogList() {
  useSeo({ title: blog.title, description: blog.intro, path: '/blog' })

  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState(null)
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {})
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(false)
    getPosts({ page, perPage: PER_PAGE, category })
      .then((r) => {
        if (cancelled) return
        setPosts((prev) => (page === 1 ? r.posts : [...prev, ...r.posts]))
        setTotalPages(r.totalPages)
      })
      .catch(() => !cancelled && setError(true))
      .finally(() => !cancelled && setLoading(false))
    return () => {
      cancelled = true
    }
  }, [page, category, attempt])

  const pick = (id) => {
    setCategory(id)
    setPage(1)
    setPosts([])
  }

  return (
    <section className="blog-page">
      <div className="container">
        <header className="blog-head">
          <div className="masthead">
            <span>{blog.title}</span>
            <span>Articles & Essays</span>
            <span>Updated regularly</span>
          </div>
          <h1 className="blog-head__title">
            The <em>Journal</em>
          </h1>
          <p className="blog-head__intro">{blog.intro}</p>
        </header>

        {categories.length > 1 && (
          <div className="filters filters--left">
            <button className={`filter ${category === null ? 'filter--active' : ''}`} onClick={() => pick(null)}>
              All
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`filter ${category === c.id ? 'filter--active' : ''}`}
                onClick={() => pick(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}

        {error && posts.length === 0 ? (
          <div className="blog-empty">
            <p className="hand">Oops — couldn't load the articles.</p>
            <button className="btn btn--line" onClick={() => setAttempt(attempt + 1)}>
              <span>Try again</span>
            </button>
          </div>
        ) : !loading && posts.length === 0 ? (
          <div className="blog-empty">
            <p className="hand">New articles are on their way ✎</p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((p, i) => (
              <PostCard key={p.id} post={p} index={i} delay={(i % PER_PAGE) * 70} />
            ))}
            {loading && [0, 1, 2].map((i) => <PostCardSkeleton key={`s${i}`} />)}
          </div>
        )}

        {!loading && page < totalPages && (
          <div className="blog-more">
            <button className="btn" onClick={() => setPage(page + 1)}>
              <span>Load more articles</span>
              <i>↓</i>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
