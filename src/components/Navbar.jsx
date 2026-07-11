import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center font-display font-bold text-sm">
            OG
          </span>
          <span className="font-display font-semibold text-sm tracking-wide hidden sm:block">
            Ordinary Ghost
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`font-body text-sm transition-colors ${
                location.pathname === l.to ? 'text-gold' : 'text-offwhite/70 hover:text-offwhite'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="glass-panel glow-gold px-5 py-2 rounded-full text-sm font-medium transition-shadow duration-300"
          >
            Book a call
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="sm:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-offwhite transition-transform ${open ? 'rotate-45 translate-y-1.5' : ''}`} />
          <span className={`block w-5 h-px bg-offwhite transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-offwhite transition-transform ${open ? '-rotate-45 -translate-y-1.5' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden glass-panel mx-4 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`font-body text-sm py-3 px-2 rounded-lg transition-colors ${
                    location.pathname === l.to ? 'text-gold' : 'text-offwhite/70'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
