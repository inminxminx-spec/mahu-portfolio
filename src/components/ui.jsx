import { useEffect, useRef, useState } from 'react'

// Fades/slides its children in when they scroll into view
export function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'is-in' : ''} ${className}`} style={{ '--d': `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  )
}

export function SectionHead({ num, label, title }) {
  return (
    <div className="shead">
      <Reveal className="shead__meta">
        <span>{num}</span>
        <span className="shead__rule" />
        <span>{label}</span>
      </Reveal>
      <Reveal as="h2" delay={120} className="shead__title">
        {title}
      </Reveal>
    </div>
  )
}

// Counts from 0 up to a value like "500+" once visible
export function CountUp({ value }) {
  const target = parseInt(value, 10)
  const suffix = value.replace(/^\d+/, '')
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    let raf
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now) => {
        const p = Math.min((now - start) / 1800, 1)
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(ref.current)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

// Thin bar at the top that fills as you scroll — like a reading progress bar
export function ReadingProgress() {
  const ref = useRef(null)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1)
      ref.current.style.transform = `scaleX(${p})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="progress" aria-hidden="true">
      <div ref={ref} />
    </div>
  )
}

// Custom cursor (desktop only). Add data-cursor="Text" to any element to show a label.
export function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [hover, setHover] = useState(false)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    document.body.classList.add('has-cursor')

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y
    let raf

    const move = (e) => {
      x = e.clientX
      y = e.clientY
      dot.current.style.transform = `translate(${x}px, ${y}px)`
      const target = e.target.closest?.('a, button, [data-cursor]')
      setHover(!!target)
      setLabel(target?.dataset.cursor || '')
    }
    const loop = () => {
      rx += (x - rx) * 0.16
      ry += (y - ry) * 0.16
      ring.current.style.transform = `translate(${rx}px, ${ry}px)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    loop()
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className={`cursor-ring ${hover ? 'is-hover' : ''} ${label ? 'has-label' : ''}`}>
        <div className="cursor-ring__c">{label}</div>
      </div>
    </>
  )
}
