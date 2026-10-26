import { useState } from 'react'
import { profile } from '../data.js'
import { Reveal } from './ui.jsx'
import { blogEnabled } from '../wordpress.js'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  // Opens the visitor's email app with the message pre-filled
  const submit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New project enquiry from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <Reveal className="shead__meta">
          <span>{blogEnabled ? '07' : '06'}</span>
          <span className="shead__rule" />
          <span>Contact</span>
        </Reveal>

        <Reveal as="h2" delay={100} className="contact__title">
          Got a story?
          <br />
          Let's <em>write</em> it.
        </Reveal>

        <Reveal delay={200}>
          <a href={`mailto:${profile.email}`} className="contact__mail">
            {profile.email} <span>↗</span>
          </a>
        </Reveal>

        <div className="contact__grid">
          <Reveal delay={100} className="contact__info">
            <div>
              <span>Phone</span>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
            </div>
            <div>
              <span>Based in</span>
              <p>{profile.location} — working worldwide</p>
            </div>
            <div>
              <span>Follow</span>
              <p className="contact__socials">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.url} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                ))}
              </p>
            </div>
          </Reveal>

          <Reveal as="form" delay={200} className="form" onSubmit={submit}>
            <input name="name" placeholder="Your name" value={form.name} onChange={update} required />
            <input type="email" name="email" placeholder="Your email" value={form.email} onChange={update} required />
            <textarea
              name="message"
              rows="4"
              placeholder="Tell me about your project…"
              value={form.message}
              onChange={update}
              required
            />
            <button type="submit" className="form__send">
              Send <span>↗</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
