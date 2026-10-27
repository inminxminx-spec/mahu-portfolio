// Vercel serverless function for /blog and /blog/:slug.
// Social apps (WhatsApp, LinkedIn, Facebook) and search engines read the raw HTML before any
// JavaScript runs, so this fills in the real title, description, image, structured data and
// article text on the server. React then takes over in the browser as usual.
import { API, blogEnabled } from '../src/wordpress.js'
import { blog, profile } from '../src/data.js'

const SITE = 'https://www.minnxx.com'

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–', rsquo: '’', lsquo: '‘', rdquo: '”', ldquo: '“' }

function decode(text = '') {
  return text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m)
}

const toText = (html = '') => decode(html.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim()

const escape = (text = '') =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

function clip(text, max = 160) {
  if (text.length <= max) return text
  return text.slice(0, text.lastIndexOf(' ', max - 1)) + '…'
}

async function fetchJson(path) {
  const res = await fetch(API + path)
  if (!res.ok) throw new Error(`WordPress ${res.status}`)
  return res.json()
}

// Replaces the existing tag (or adds it before </head>)
function setTag(html, pattern, tag) {
  return pattern.test(html) ? html.replace(pattern, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function applySeo(html, { title, description, url, image, type, jsonLd, body, noindex }) {
  const metas = [
    [/<title>[\s\S]*?<\/title>/, `<title>${escape(title)}</title>`],
    [/<meta name="description"[^>]*>/, `<meta name="description" content="${escape(description)}" />`],
    [/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`],
    [/<meta name="robots"[^>]*>/, `<meta name="robots" content="${noindex ? 'noindex' : 'index, follow, max-image-preview:large'}" />`],
    [/<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`],
    [/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`],
    [/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escape(title)}" />`],
    [/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${escape(description)}" />`],
    [/<meta name="twitter:card"[^>]*>/, `<meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}" />`],
    [/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escape(title)}" />`],
    [/<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${escape(description)}" />`],
  ]
  if (image) {
    metas.push([/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${escape(image)}" />`])
    metas.push([/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${escape(image)}" />`])
  }
  for (const [pattern, tag] of metas) html = setTag(html, pattern, tag)

  if (jsonLd) {
    html = html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>\n  </head>`)
  }
  // Readable content for crawlers; React replaces it as soon as the app loads
  if (body) html = html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  return html
}

const author = { '@type': 'Person', name: profile.name, url: `${SITE}/` }

async function articlePage(slug) {
  const [post] = await fetchJson(`/posts?_embed&slug=${encodeURIComponent(slug)}`)
  if (!post) return null

  const title = decode(post.title.rendered)
  const description = clip(toText(post.excerpt.rendered).replace(/\s*\[…\]$/, '') || toText(post.content.rendered))
  const url = `${SITE}/blog/${post.slug}`
  const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
  const categories = (post._embedded?.['wp:term']?.[0] || []).map((c) => decode(c.name))

  return {
    title: `${title} | ${profile.name}`,
    description,
    url,
    image,
    type: 'article',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: title,
          description,
          image: image ? [image] : undefined,
          datePublished: new Date(post.date_gmt + 'Z').toISOString(),
          dateModified: new Date(post.modified_gmt + 'Z').toISOString(),
          author,
          publisher: author,
          mainEntityOfPage: url,
          articleSection: categories[0],
          keywords: categories.join(', ') || undefined,
          wordCount: toText(post.content.rendered).split(' ').length,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
            { '@type': 'ListItem', position: 2, name: blog.title, item: `${SITE}/blog` },
            { '@type': 'ListItem', position: 3, name: title, item: url },
          ],
        },
      ],
    },
    body:
      `<article class="article"><div class="container article__narrow">` +
      `<p><a href="/blog">← ${escape(blog.title)}</a></p>` +
      `<h1 class="article__title">${escape(title)}</h1>` +
      `<p>By ${escape(profile.name)} · <time datetime="${post.date}">${post.date.slice(0, 10)}</time></p>` +
      (image ? `<img src="${escape(image)}" alt="${escape(title)}" style="max-width:100%;height:auto" />` : '') +
      `<div class="prose">${post.content.rendered}</div>` +
      `</div></article>`,
  }
}

async function listPage() {
  const posts = await fetchJson('/posts?_fields=slug,title,excerpt&per_page=30')
  const url = `${SITE}/blog`
  return {
    title: `${blog.title} | ${profile.name}`,
    description: blog.intro,
    url,
    type: 'website',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `${blog.title} — ${profile.name}`,
      description: blog.intro,
      url,
      author,
      blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: decode(p.title.rendered), url: `${SITE}/blog/${p.slug}` })),
    },
    body:
      `<section class="blog-page"><div class="container"><h1>${escape(blog.title)}</h1><p>${escape(blog.intro)}</p><ul>` +
      posts.map((p) => `<li><a href="/blog/${p.slug}">${escape(decode(p.title.rendered))}</a> — ${escape(clip(toText(p.excerpt.rendered), 140))}</li>`).join('') +
      `</ul></div></section>`,
  }
}

export default async function handler(req, res) {
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'www.minnxx.com'
  const shell = await fetch(`https://${host}/index.html`).then((r) => r.text())
  const slug = typeof req.query?.slug === 'string' ? req.query.slug : ''

  let html = shell
  let status = 200
  if (blogEnabled) {
    try {
      const seo = slug ? await articlePage(slug) : await listPage()
      if (seo) html = applySeo(shell, seo)
      else {
        status = 404
        html = applySeo(shell, { title: `Page not found | ${profile.name}`, description: '', url: `${SITE}/blog/${slug}`, type: 'website', noindex: true })
      }
    } catch {
      // WordPress unreachable: serve the plain app, the browser will load content itself
    }
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=86400')
  res.status(status).send(html)
}
