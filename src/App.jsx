import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Work from './components/Work.jsx'
import Journal from './components/Journal.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BlogList from './pages/BlogList.jsx'
import BlogPost from './pages/BlogPost.jsx'
import NotFound from './pages/NotFound.jsx'
import { Cursor, ReadingProgress } from './components/ui.jsx'
import { useSeo } from './seo.js'
import { blogEnabled } from './wordpress.js'

function Home() {
  useSeo({ path: '/' })
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <Process />
      <Work />
      {blogEnabled && <Journal />}
      <Testimonials />
      <Contact />
    </>
  )
}

// Scrolls to the #section in the URL, or to the top when the page changes
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 60)
      return () => clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <ReadingProgress />
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {blogEnabled && <Route path="/blog" element={<BlogList />} />}
          {blogEnabled && <Route path="/blog/:slug" element={<BlogPost />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
