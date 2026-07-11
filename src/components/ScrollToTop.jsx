import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Drop this inside <BrowserRouter>, above your routes. Resets scroll
// to the top on every path change — without it, navigating from the
// bottom of a long page leaves the next page scrolled to the same spot.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
