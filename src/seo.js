import { useEffect } from 'react'
import { profile } from './data.js'

const SITE = 'https://www.minnxx.com'
const DEFAULT_TITLE = `${profile.name} — ${profile.role} | minnxx`
const DEFAULT_DESCRIPTION = document.querySelector('meta[name="description"]')?.content || ''

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement(selector.startsWith('link') ? 'link' : 'meta')
    const [, key, name] = selector.match(/\[(\w+)="([^"]+)"\]/)
    el.setAttribute(key, name)
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

// Updates the page title, description, canonical URL and share preview for each page
export function useSeo({ title, description, path = '/', image } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${profile.name}` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESCRIPTION
    const url = SITE + path

    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', title || `${profile.name} — ${profile.role}`)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:type"]', 'content', title ? 'article' : 'website')
    if (image) setMeta('meta[property="og:image"]', 'content', image)
  }, [title, description, path, image])
}
