// Vercel serverless function: builds /sitemap.xml with every blog post from WordPress,
// so Google finds new articles automatically.
import { API, blogEnabled } from '../src/wordpress.js'

const SITE = 'https://www.minnxx.com'

async function getAllPosts() {
  const posts = []
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(`${API}/posts?_fields=slug,modified&per_page=100&page=${page}`)
    if (!res.ok) break
    posts.push(...(await res.json()))
    if (page >= Number(res.headers.get('X-WP-TotalPages') || 1)) break
  }
  return posts
}

export default async function handler(req, res) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = [{ loc: `${SITE}/`, lastmod: today, priority: '1.0' }]

  if (blogEnabled) {
    urls.push({ loc: `${SITE}/blog`, lastmod: today, priority: '0.8' })
    try {
      for (const p of await getAllPosts()) {
        urls.push({ loc: `${SITE}/blog/${p.slug}`, lastmod: p.modified.slice(0, 10), priority: '0.7' })
      }
    } catch {
      // WordPress unreachable: still serve the main pages
    }
  }

  const xml =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls
      .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <priority>${u.priority}</priority>\n  </url>`)
      .join('\n') +
    '\n</urlset>\n'

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  res.status(200).send(xml)
}
