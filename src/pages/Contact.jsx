import { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const faqs = [
  {
    q: 'How long does a build take?',
    a: 'Most builds go live in 1\u20132 weeks after scoping, depending on how much customization your shop needs.',
  },
  {
    q: 'What does it cost?',
    a: 'Custom builds start at $300. We\u2019ll give you a fixed price on the call once we understand your setup \u2014 no surprises after.',
  },
  {
    q: 'Do I need any technical knowledge?',
    a: 'No. We handle the build, hosting, and setup end-to-end. You just use the dashboard.',
  },
  {
    q: 'What if I\u2019m not happy with it?',
    a: 'We scope the project together up front so expectations are clear before any work starts, and we stay involved through launch to make sure it fits how you actually work.',
  },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

 const [sending, setSending] = useState(false)
const [error, setError] = useState('')

const handleSubmit = async (e) => {
  e.preventDefault()
  setSending(true)
  setError('')

  try {
    const res = await fetch('https://formspree.io/f/xrenzggk', {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(e.target),
    })

    if (res.ok) {
      setSubmitted(true)
    } else {
      setError('Something went wrong — try emailing us directly.')
    }
  } catch {
    setError('Something went wrong — try emailing us directly.')
  } finally {
    setSending(false)
  }
}

  return (
    <div className="pt-32 pb-24 px-6 sm:px-8 max-w-5xl mx-auto">
      <motion.p {...fadeUp} className="font-mono text-xs uppercase tracking-widest text-gold mb-3">
        Get in touch
      </motion.p>
      <motion.h1 {...fadeUp} className="font-display font-bold text-4xl sm:text-6xl mb-4">
        Let's talk about your shop.
      </motion.h1>
      <motion.p {...fadeUp} className="font-body text-offwhite/60 max-w-xl mb-16 leading-relaxed">
        Tell us a bit about your business and we'll get back to you within a day.
      </motion.p>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Form */}
        <motion.div {...fadeUp}>
          {submitted ? (
            <div className="glass-panel rounded-2xl p-8 text-center">
              <h3 className="font-display font-semibold text-xl mb-2">Message sent</h3>
              <p className="font-body text-sm text-offwhite/60">
                Thanks — we'll reply within a day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="font-mono text-xs uppercase tracking-wide text-offwhite/50 block mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full glass-panel rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-wide text-offwhite/50 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full glass-panel rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors"
                  placeholder="you@business.com"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-wide text-offwhite/50 block mb-2">
                  Business name
                </label>
                <input
                  type="text"
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  className="w-full glass-panel rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors"
                  placeholder="Your shop's name"
                />
              </div>
              <div>
                <label className="font-mono text-xs uppercase tracking-wide text-offwhite/50 block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full glass-panel rounded-xl px-4 py-3 font-body text-sm outline-none focus:border-gold/50 transition-colors resize-none"
                  placeholder="What's slowing your bookings down?"
                />
              </div>
           <button
  type="submit"
  disabled={sending}
  className="glass-panel glow-gold px-8 py-3 rounded-full font-body font-medium transition-shadow duration-300 w-full sm:w-auto disabled:opacity-50"
>
  {sending ? 'Sending...' : 'Send message'}
</button>
{error && <p className="text-sm text-red-400 mt-3">{error}</p>}
            </form>
          )}

          <div className="mt-10 pt-10 border-t border-offwhite/10">
            <p className="font-mono text-xs uppercase tracking-wide text-offwhite/50 mb-3">
              Or reach us directly
            </p>
            <a href="mailto:ordinaryghostagency@gmail.com" className="block font-body text-sm text-gold mb-1">
              ordinaryghostagency@gmail.com
            </a>
         <a href="https://wa.me/923328166787" target="_blank" rel="noopener noreferrer" className="block font-body text-sm text-offwhite/60">
  WhatsApp: +92 332 8166787
</a>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div {...fadeUp}>
          <h2 className="font-display font-semibold text-xl mb-6">Common questions</h2>
          <div className="space-y-0">
            {faqs.map((f, i) => (
              <div key={f.q} className={`py-5 ${i !== faqs.length - 1 ? 'border-b border-offwhite/10' : ''}`}>
                <h3 className="font-display font-medium text-base mb-2">{f.q}</h3>
                <p className="font-body text-sm text-offwhite/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
