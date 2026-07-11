import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

// stagger helper — pass the index within a grid/list so siblings
// don't all fire at once when they enter viewport together
const staggered = (i, base = 0.08) => ({
  ...fadeUp,
  transition: { ...fadeUp.transition, delay: i * base },
})

const values = [
  {
    title: 'Zero missed calls',
    desc: 'Your AI chatbot answers booking questions, pricing, and hours 24/7 — even when the shop is closed.',
  },
  {
    title: 'Booked on autopilot',
    desc: 'Customers book directly through chat. No back-and-forth, no phone tag, no double-booking.',
  },
  {
    title: 'One dashboard, full visibility',
    desc: 'Live analytics, payment status, and an internal AI assistant — everything in one place, not five apps.',
  },
]

const services = [
  {
    tag: '01',
    title: 'Booking Chatbot',
    desc: 'A customer-facing AI assistant that handles bookings, pricing, and hours questions — trained on your business.',
  },
  {
    tag: '02',
    title: 'Booking Management',
    desc: 'A clean system to track every booking, payment status, and customer — built for how repair shops actually work.',
  },
  {
    tag: '03',
    title: 'Owner Dashboard',
    desc: 'Live analytics and an internal AI assistant so you always know what\u2019s happening in your shop, in real time.',
  },
]

const steps = [
  { n: '1', title: 'Book a call', desc: 'We talk through your shop, your bottlenecks, and what automation actually makes sense.' },
  { n: '2', title: 'We scope your build', desc: 'A clear plan, timeline, and fixed price before any work starts. No surprises.' },
  { n: '3', title: 'Live in ~1\u20132 weeks', desc: 'Your chatbot and dashboard go live, connected to your real bookings from day one.' },
]

// Swap this in once you have real client feedback — that's the whole
// change needed, no redesign. Leave the array empty to keep the
// current "what we built" proof copy instead.
const testimonials = []

function DashboardPreview() {
  const [status, setStatus] = useState('loading') // loading | loaded | failed
  const timeoutRef = useRef(null)

  useEffect(() => {
    // iframes blocked by X-Frame-Options / CSP frame-ancestors don't
    // fire onError — they just stay blank. A short timeout plus onLoad
    // is the practical way to detect that and swap in a fallback.
    timeoutRef.current = setTimeout(() => {
      setStatus((s) => (s === 'loading' ? 'failed' : s))
    }, 4000)
    return () => clearTimeout(timeoutRef.current)
  }, [])

  const handleLoad = () => {
    clearTimeout(timeoutRef.current)
    setStatus('loaded')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="mt-16 w-full max-w-4xl rounded-2xl overflow-hidden glass-panel glass-shine relative"
      style={{ boxShadow: '0 0 80px rgba(201,169,106,0.12), 0 20px 60px rgba(0,0,0,0.5)' }}
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-offwhite/10">
        <span className="w-2.5 h-2.5 rounded-full bg-offwhite/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-offwhite/20" />
        <span className="w-2.5 h-2.5 rounded-full bg-offwhite/20" />
        <span className="ml-3 font-mono text-xs text-offwhite/40">irepair-dashboard.vercel.app</span>
      </div>

      {/* Desktop: iframe with a fallback if it fails/blocks embedding */}
      <div className="hidden sm:block relative h-[480px] sm:h-[560px]">
        {status === 'failed' ? (
          <a
            href="https://irepair-dashboard.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-6"
          >
            <span className="font-display font-semibold text-lg">iRepair Dashboard</span>
            <span className="font-body text-sm text-offwhite/60 max-w-xs">
              This preview can't be embedded — open the live demo directly instead.
            </span>
            <span className="font-body text-sm text-gold mt-1">Open live demo →</span>
          </a>
        ) : (
          <iframe
            src="https://irepair-dashboard.vercel.app"
            title="iRepair Dashboard live preview"
            className="w-full h-full"
            loading="lazy"
            onLoad={handleLoad}
          />
        )}
      </div>

      {/* Mobile: always link out, no iframe */}
      <a
        href="https://irepair-dashboard.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden flex items-center justify-center h-48 font-body text-sm text-gold"
      >
        Tap to view live demo →
      </a>
    </motion.div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 55% 35% at 50% 25%, rgba(201,169,106,0.14), transparent 70%),
              radial-gradient(ellipse 40% 30% at 15% 60%, rgba(138,109,63,0.10), transparent 70%),
              radial-gradient(ellipse 40% 30% at 85% 55%, rgba(201,169,106,0.08), transparent 70%)
            `,
          }}
        />
        <motion.h1
          {...fadeUp}
          className="font-display font-bold text-4xl sm:text-6xl text-center max-w-3xl leading-tight relative"
        >
          AI automation, <span className="text-gradient-gold">booked on autopilot.</span>
        </motion.h1>
        <motion.p
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.1 }}
          className="mt-6 text-offwhite/70 max-w-xl text-center font-body relative"
        >
          We build booking chatbots and owner dashboards for local repair
          shops and service businesses — live in production, not a mockup.
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ ...fadeUp.transition, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 relative"
        >
          <a
            href="https://irepair-dashboard.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel glow-gold px-8 py-3 rounded-full font-body font-medium transition-shadow duration-300 text-center"
          >
            See the live demo
          </a>
          <Link
            to="/contact"
            className="px-8 py-3 rounded-full font-body font-medium border border-offwhite/20 hover:border-offwhite/40 transition-colors text-center"
          >
            Book a call
          </Link>
        </motion.div>

        <DashboardPreview />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-4 flex items-center gap-2 font-mono text-xs text-offwhite/40"
        >
          <span>Demo login —</span>
          <span className="text-offwhite/60">admin</span>
          <span>/</span>
          <span className="text-offwhite/60">repeair213</span>
        </motion.div>
      </section>

      {/* Value props */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 py-24">
        <div className="grid sm:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <motion.div key={v.title} {...staggered(i)} className="glass-panel rounded-2xl p-6">
              <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
              <p className="font-body text-sm text-offwhite/60 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services teaser */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <motion.p {...fadeUp} className="font-mono text-xs uppercase tracking-widest text-gold mb-3">
          What we build
        </motion.p>
        <motion.h2 {...fadeUp} className="font-display font-bold text-3xl sm:text-4xl mb-12 max-w-2xl">
          One system. Three parts working together.
        </motion.h2>
        <div className="space-y-0">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              {...staggered(i)}
              className={`flex flex-col sm:flex-row sm:items-center gap-4 py-8 ${
                i !== services.length - 1 ? 'border-b border-offwhite/10' : ''
              }`}
            >
              <span className="font-mono text-gold text-sm w-12 shrink-0">{s.tag}</span>
              <h3 className="font-display font-semibold text-xl sm:w-64 shrink-0">{s.title}</h3>
              <p className="font-body text-sm text-offwhite/60 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Proof section — swap in a real testimonial once client #1 gives feedback */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <motion.div {...fadeUp} className="glass-panel rounded-2xl p-8 sm:p-12">
          {testimonials.length > 0 ? (
            <>
              <span className="inline-block font-mono text-xs uppercase tracking-widest text-gold border border-gold/30 rounded-full px-3 py-1 mb-6">
                What clients say
              </span>
              <p className="font-display text-2xl sm:text-3xl mb-4 max-w-xl leading-snug">
                “{testimonials[0].quote}”
              </p>
              <p className="font-body text-sm text-offwhite/60">
                {testimonials[0].name} — {testimonials[0].business}
              </p>
            </>
          ) : (
            <>
              <span className="inline-block font-mono text-xs uppercase tracking-widest text-emerald border border-emerald/30 rounded-full px-3 py-1 mb-6">
                Currently onboarding first clients
              </span>
              <h3 className="font-display font-semibold text-2xl sm:text-3xl mb-4 max-w-xl">
                What we've built: a full-stack AI booking system, live in production.
              </h3>
              <p className="font-body text-sm text-offwhite/60 max-w-xl leading-relaxed">
                iRepair isn't a mockup or a template — it's a real chatbot handling
                real booking conversations, a real dashboard tracking real payment
                status, connected to a real database. Everything you see in the
                demo is what your shop would actually run on.
              </p>
            </>
          )}
        </motion.div>
      </section>

      {/* Process + pricing */}
      <section className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <motion.p {...fadeUp} className="font-mono text-xs uppercase tracking-widest text-gold mb-3">
          How it works
        </motion.p>
        <motion.h2 {...fadeUp} className="font-display font-bold text-3xl sm:text-4xl mb-12 max-w-2xl">
          From call to live, in about two weeks.
        </motion.h2>
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {steps.map((s, i) => (
            <motion.div key={s.n} {...staggered(i)} className="relative">
              <span className="font-display font-bold text-4xl text-gold/30">{s.n}</span>
              <h3 className="font-display font-semibold text-lg mt-2 mb-2">{s.title}</h3>
              <p className="font-body text-sm text-offwhite/60 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.p {...fadeUp} className="font-body text-sm text-offwhite/50">
          Custom builds start at <span className="text-gold font-medium">$300</span> — scoped to your shop on the call, fixed price before we start.
        </motion.p>
      </section>

      {/* Final CTA */}
      <section className="max-w-4xl mx-auto px-6 sm:px-8 py-24 text-center">
        <motion.h2 {...fadeUp} className="font-display font-bold text-3xl sm:text-5xl mb-6">
          Stop losing bookings to <span className="text-gradient-gold">missed calls.</span>
        </motion.h2>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
          <Link
            to="/contact"
            className="inline-block glass-panel glow-gold px-10 py-4 rounded-full font-body font-medium transition-shadow duration-300"
          >
            Book a free call
          </Link>
        </motion.div>
      </section>
    </>
  )
}
