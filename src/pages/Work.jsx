import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
}

const stack = ['React', 'Tailwind', 'Zustand', 'FastAPI', 'Supabase', 'Postgres', 'Groq Llama 3.3']

export default function Work() {
  return (
    <div className="pt-32 pb-24 px-6 sm:px-8 max-w-4xl mx-auto">
      <motion.p {...fadeUp} className="font-mono text-xs uppercase tracking-widest text-gold mb-3">
        Case study
      </motion.p>
      <motion.h1 {...fadeUp} className="font-display font-bold text-4xl sm:text-6xl mb-6">
        iRepair Dashboard
      </motion.h1>
      <motion.p {...fadeUp} className="font-body text-lg text-offwhite/60 max-w-2xl mb-10 leading-relaxed">
        A full-stack AI-powered booking and automation platform, built for local
        repair shops — from first line of code to a live system handling real bookings.
      </motion.p>

      <motion.a
        {...fadeUp}
        href="https://irepair-dashboard.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block glass-panel glow-gold px-8 py-3 rounded-full font-body font-medium transition-shadow duration-300 mb-16"
      >
        Open the live demo →
      </motion.a>

      {/* The problem */}
      <motion.div {...fadeUp} className="mb-16">
        <h2 className="font-display font-semibold text-2xl mb-4">The problem</h2>
        <p className="font-body text-offwhite/60 leading-relaxed max-w-2xl">
          Local repair shops lose bookings every day to missed calls, slow
          replies, and manual scheduling. Owners are on the tools, not the
          phone — every unanswered call is a customer who books somewhere else.
        </p>
      </motion.div>

      {/* The build */}
      <motion.div {...fadeUp} className="mb-16">
        <h2 className="font-display font-semibold text-2xl mb-4">The build</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-display font-semibold text-base mb-2">Customer chatbot</h3>
            <p className="font-body text-sm text-offwhite/60 leading-relaxed">
              Handles bookings, pricing, and hours Q&A around the clock, with
              fuzzy matching for natural conversation and graceful fallback
              if the AI is unavailable.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-display font-semibold text-base mb-2">Booking system</h3>
            <p className="font-body text-sm text-offwhite/60 leading-relaxed">
              Tracks every booking and payment status, with persistent
              sessions so nothing gets lost mid-conversation.
            </p>
          </div>
          <div className="glass-panel rounded-2xl p-6">
            <h3 className="font-display font-semibold text-base mb-2">Owner dashboard</h3>
            <p className="font-body text-sm text-offwhite/60 leading-relaxed">
              Live analytics and an internal AI assistant, so the owner
              always knows what's happening without digging through spreadsheets.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tech stack */}
      <motion.div {...fadeUp} className="mb-16">
        <h2 className="font-display font-semibold text-2xl mb-4">Under the hood</h2>
        <div className="flex flex-wrap gap-2">
          {stack.map((t) => (
            <span
              key={t}
              className="font-mono text-xs px-3 py-1.5 rounded-full border border-offwhite/15 text-offwhite/60"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Result */}
      <motion.div {...fadeUp} className="mb-16">
        <h2 className="font-display font-semibold text-2xl mb-4">The result</h2>
        <p className="font-body text-offwhite/60 leading-relaxed max-w-2xl">
          A production-ready system, live and running end-to-end — real
          chatbot conversations, real bookings, real dashboard data. Not a
          mockup, not a template preview. This is the exact system a repair
          shop would run their business on.
        </p>
      </motion.div>

      <motion.div {...fadeUp} className="glass-panel rounded-2xl p-8 sm:p-12 text-center">
        <h3 className="font-display font-semibold text-2xl mb-4">Want this for your business?</h3>
        <p className="font-body text-sm text-offwhite/60 mb-6 max-w-md mx-auto">
          Every build is reskinned and scoped to your shop — same proven system, tailored to how you work.
        </p>
        <Link
          to="/contact"
          className="inline-block glass-panel glow-gold px-8 py-3 rounded-full font-body font-medium transition-shadow duration-300"
        >
          Book a free call
        </Link>
      </motion.div>
    </div>
  )
}
