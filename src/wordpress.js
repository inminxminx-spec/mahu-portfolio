// Fetches blog posts from WordPress (WordPress.com or self-hosted) using its REST API.
import { blog } from './data.js'

const site = blog.wordpressSite.trim().replace(/^https?:\/\//, '').replace(/\/+$/, '')

export const blogEnabled = site !== ''

// WordPress.com sites are served through the public API; self-hosted sites expose /wp-json
export const API = site.endsWith('.wordpress.com')
  ? `https://public-api.wordpress.com/wp/v2/sites/${site}`
  : `https://${site}/wp-json/wp/v2`

const cache = new Map()

async function request(path) {
  if (cache.has(path)) return cache.get(path)
  const promise = fetch(API + path).then(async (res) => {
    if (!res.ok) throw new Error(`WordPress request failed (${res.status})`)
    return { data: await res.json(), totalPages: Number(res.headers.get('X-WP-TotalPages') || 1) }
  })
  cache.set(path, promise)
  promise.catch(() => cache.delete(path))
  return promise
}

// Turns HTML like "Tips &amp; Tricks" into plain text
export function toText(html = '') {
  return new DOMParser().parseFromString(html, 'text/html').documentElement.textContent.trim()
}

function normalize(post) {
  const words = toText(post.content?.rendered).split(/\s+/).filter(Boolean).length
  const media = post._embedded?.['wp:featuredmedia']?.[0]
  return {
    id: post.id,
    slug: post.slug,
    title: toText(post.title.rendered),
    excerpt: toText(post.excerpt.rendered).replace(/\s*\[…\]$|\s*\[&hellip;\]$/, '…'),
    content: post.content.rendered,
    date: new Date(post.date),
    image: media?.source_url || '',
    imageAlt: media?.alt_text || '',
    categories: (post._embedded?.['wp:term']?.[0] || []).map((c) => ({ id: c.id, name: toText(c.name) })),
    readTime: Math.max(1, Math.round(words / 200)),
  }
}

export async function getPosts({ page = 1, perPage = 9, category } = {}) {
  const query = `/posts?_embed&per_page=${perPage}&page=${page}${category ? `&categories=${category}` : ''}`
  const { data, totalPages } = await request(query)
  return { posts: data.map(normalize), totalPages }
}

export async function getPost(slug) {
  const { data } = await request(`/posts?_embed&slug=${encodeURIComponent(slug)}`)
  return data[0] ? normalize(data[0]) : null
}

export async function getCategories() {
  const { data } = await request('/categories?per_page=50&hide_empty=true&orderby=count&order=desc')
  return data.map((c) => ({ id: c.id, name: toText(c.name) }))
}

export function formatDate(date) {
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}
