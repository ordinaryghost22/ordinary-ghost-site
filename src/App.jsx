import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import IntroReveal from './components/IntroReveal'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import Home from './pages/Home'
import Work from './pages/Work'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import ScrollToTop from './components/ScrollToTop'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/work" element={<PageWrapper><Work /></PageWrapper>} />
        <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  const [introDone, setIntroDone] = useState(false)

  return (
    <BrowserRouter>
    <ScrollToTop />
      <IntroReveal onDone={() => setIntroDone(true)} />

      <div className="grain-overlay" />
      <CursorGlow />
      <div className="min-h-screen bg-void text-offwhite font-body flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
