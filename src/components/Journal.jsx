import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPosts } from '../wordpress.js'
import PostCard, { PostCardSkeleton } from './PostCard.jsx'
import { Reveal, SectionHead } from './ui.jsx'

// Latest 3 blog posts on the home page
export default function Journal() {
  const [posts, setPosts] = useState(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    getPosts({ perPage: 3 })
      .then((r) => setPosts(r.posts))
      .catch(() => setFailed(true))
  }, [])

  // hide the whole section if WordPress is unreachable or has no posts yet
  if (failed || (posts && posts.length === 0)) return null

  return (
    <section id="journal" className="section">
      <div className="container">
        <div className="work__head">
          <SectionHead
            num="05"
            label="Journal"
            title={
              <>
                Fresh from my <em>desk</em>
              </>
            }
          />
          <Reveal delay={150} className="journal__all">
            <Link to="/blog" className="btn btn--line">
              <span>All articles</span>
              <i>→</i>
            </Link>
          </Reveal>
        </div>

        <div className="posts-grid">
          {posts
            ? posts.map((p, i) => <PostCard key={p.id} post={p} index={i} delay={i * 100} />)
            : [0, 1, 2].map((i) => <PostCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}
