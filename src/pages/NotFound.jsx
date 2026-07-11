import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
      <motion.p
        {...fadeUp}
        className="font-mono text-xs uppercase tracking-widest text-gold mb-4"
      >
        404
      </motion.p>

      <motion.h1
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.1 }}
        className="font-display font-bold text-4xl sm:text-6xl mb-4"
      >
        This page went <span className="text-gradient-gold">off-grid.</span>
      </motion.h1>

      <motion.p
        {...fadeUp}
        transition={{ ...fadeUp.transition, delay: 0.2 }}
        className="font-body text-offwhite/60 max-w-md mb-10 leading-relaxed"
      >
        The page you're looking for doesn't exist or moved. Let's get you
        back on track.
      </motion.p>

      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.3 }}>
        <Link
          to="/"
          className="inline-block glass-panel glow-gold px-8 py-3 rounded-full font-body font-medium transition-shadow duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  )
}
