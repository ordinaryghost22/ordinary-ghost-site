import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-offwhite/10 mt-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center font-display font-bold text-xs">
            OG
          </span>
          <span className="font-display font-medium text-sm text-offwhite/70">
            Ordinary Ghost Agency
          </span>
        </div>
        <p className="font-body text-xs text-offwhite/40 text-center">
          AI automation for local service businesses.
        </p>
        <div className="flex items-center gap-5 font-body text-xs text-offwhite/50">
          <Link to="/work" className="hover:text-offwhite transition-colors">Work</Link>
          <Link to="/contact" className="hover:text-offwhite transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
