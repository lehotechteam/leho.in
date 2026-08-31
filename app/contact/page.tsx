'use client'

import { FormEvent, useState } from 'react'
import { Phone, Mail, MapPin, ExternalLink, Send } from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa6'
import { FaXTwitter } from 'react-icons/fa6'
import { ContentPage } from '../components/PageComponents'

const socialLinks = [
  { name: 'Facebook', handle: '@LadakhEnvironmentandHealthOrganization', href: 'https://www.facebook.com/LadakhEnvironmentandHealthOrganization/', icon: FaFacebookF },
  { name: 'LinkedIn', handle: '@leho-ladakh', href: 'https://www.linkedin.com/company/ladakh-environment-and-health-organization/', icon: FaLinkedinIn },
  { name: 'X', handle: '@LEHO_Ladakh', href: 'https://x.com/LEHO_Ladakh', icon: FaXTwitter },
  { name: 'Instagram', handle: '@leho_ladakh', href: 'https://www.instagram.com/leho_ladakh/', icon: FaInstagram },
  { name: 'YouTube', handle: '@LEHO Ladakh', href: 'https://www.youtube.com/results?search_query=Ladakh+Environment+and+Health+Organization', icon: FaYoutube },
]

const initialForm = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: 'idle', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send email.')
      }

      setForm(initialForm)
      setStatus({ type: 'success', message: 'Your message has been sent. We will get back to you soon.' })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send email.'
      setStatus({ type: 'error', message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ContentPage eyebrow="Come and connect" title="Contact LEHO">
      <div className="contact-shell">
        <aside className="contact-sidebar">
          <p className="eyebrow">Visit us</p>
          <p className="contact-lead">Ladakh Environment<br />and Health Organization</p>
          <p className="contact-address">G H Road, Skara Juk<br />Leh, Ladakh, 194101<br />J&K, India</p>
          <a className="button button-dark" href="https://maps.app.goo.gl/29qhTpbca7UFEdfAA" target="_blank" rel="noreferrer"><MapPin size={16} /> View location</a>

          <div className="contact-badges">
            <a href="tel:+911982252944"><Phone size={16} /> <span>+91 1982 252944</span></a>
            <a href="tel:+919419180650"><Phone size={16} /> <span>+91 9419180650</span></a>
            <a href="mailto:president@leho.in"><Mail size={16} /> <span>president@leho.in</span></a>
          </div>

          <div className="contact-socials">
            <p className="eyebrow">Follow LEHO</p>
            <div className="contact-social-list">
              {socialLinks.map((social) => { const SocialIcon = social.icon; return <a href={social.href} target="_blank" rel="noreferrer" key={social.name}><SocialIcon aria-hidden="true" /><span>{social.name}</span></a> })}
            </div>
          </div>
        </aside>

        <section className="contact-panel">
          <p className="eyebrow">Send a message</p>
          <h3>We’d love to hear from you</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              <span>Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Your name"
                required
              />
            </label>

            <label>
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="you@example.com"
                required
              />
            </label>

            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
                placeholder="Optional"
              />
            </label>

            <label>
              <span>Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                placeholder="Tell us how we can help"
                rows={5}
                required
              />
            </label>

            <button type="submit" className="button button-dark contact-submit" disabled={isSubmitting}>
              <Send size={16} /> {isSubmitting ? 'Sending...' : 'Send message'}
            </button>

            {status.type !== 'idle' && (
              <p className={`contact-status ${status.type}`} role="status">
                {status.message}
              </p>
            )}
          </form>
        </section>
      </div>
    </ContentPage>
  )
}
