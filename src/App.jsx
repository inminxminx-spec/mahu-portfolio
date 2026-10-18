import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Process from './components/Process.jsx'
import Work from './components/Work.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { Cursor, ReadingProgress } from './components/ui.jsx'

export default function App() {
  return (
    <>
      <ReadingProgress />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <Work />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
