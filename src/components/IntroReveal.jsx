import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function SmokeCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const w = () => canvas.clientWidth
    const h = () => canvas.clientHeight

    const isMobile = window.innerWidth < 640
    const count = isMobile ? 14 : 24
    particlesRef.current = Array.from({ length: count }, () => ({
      x: w() / 2 + (Math.random() - 0.5) * w() * 1.1,
      y: h() / 2 + (Math.random() - 0.5) * h() * 1.1,
      r: 90 + Math.random() * 160,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }))

    let start = performance.now()

    const draw = (t) => {
      const elapsed = (t - start) / 1000
      ctx.clearRect(0, 0, w(), h())
      ctx.globalCompositeOperation = 'lighter'

      let convergence
      if (elapsed < 1.0) {
        convergence = elapsed / 1.0
      } else if (elapsed < 1.3) {
        convergence = 1
      } else {
        convergence = Math.max(0, 1 - (elapsed - 1.3) / 0.7)
      }

      const cx = w() / 2
      const cy = h() / 2

      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        const dx = cx - p.x
        const dy = cy - p.y
        const pull = elapsed < 1.3 ? 0.014 * convergence : -0.024 * (1 - convergence)
        p.x += dx * pull
        p.y += dy * pull

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        const alpha = 0.28 * convergence + 0.05
        grad.addColorStop(0, `rgba(214,182,124,${alpha})`)
        grad.addColorStop(0.4, `rgba(160,150,140,${alpha * 0.5})`)
        grad.addColorStop(1, 'rgba(10,10,13,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.globalCompositeOperation = 'source-over'

      if (elapsed < 2.4) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}

export default function IntroReveal({ onDone }) {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return true
    return !sessionStorage.getItem('og_intro_seen')
  })

  useEffect(() => {
    if (!visible) {
      onDone?.()
      return
    }
    sessionStorage.setItem('og_intro_seen', '1')

    const timer = setTimeout(() => {
      setVisible(false)
      onDone?.()
    }, 2400)

    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const skip = () => {
    setVisible(false)
    onDone?.()
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-void flex items-center justify-center cursor-pointer overflow-hidden"
          onClick={skip}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          <SmokeCanvas />

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.0, duration: 0.3, ease: 'easeOut' }}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-void border border-gold/30 flex items-center justify-center mb-4"
              style={{ boxShadow: '0 0 40px rgba(201,169,106,0.25)' }}
            >
              <span className="font-display font-bold text-3xl sm:text-4xl text-offwhite">OG</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, letterSpacing: '0.4em', y: 8 }}
              animate={{ opacity: 1, letterSpacing: '0.15em', y: 0 }}
              transition={{ delay: 1.5, duration: 0.6, ease: 'easeOut' }}
              className="font-display font-semibold text-offwhite text-sm sm:text-base uppercase text-center px-4"
            >
              Ordinary Ghost Agency
            </motion.h1>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}