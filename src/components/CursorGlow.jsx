import { useEffect, useRef, useState } from 'react'

// Renders a soft gold glow that follows the mouse, desktop only.
// Uses direct DOM transform (not React state per frame) so it stays
// smooth and doesn't trigger re-renders on every mousemove.
export default function CursorGlow() {
  const dotRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // fine pointer + hover = real mouse, not touch. Also respects
    // reduced-motion preference.
    const hasFinePointer = window.matchMedia('(pointer: fine) and (hover: hover)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(hasFinePointer && !prefersReducedMotion)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    let raf

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const tick = () => {
      // simple lerp for a trailing feel
      x += (targetX - x) * 0.15
      y += (targetY - y) * 0.15
      if (dot) dot.style.transform = `translate3d(${x - 150}px, ${y - 150}px, 0)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={dotRef}
      className="fixed top-0 left-0 w-[300px] h-[300px] rounded-full pointer-events-none z-20"
      style={{
        background:
          'radial-gradient(circle, rgba(201,169,106,0.10), transparent 70%)',
        willChange: 'transform',
      }}
    />
  )
}
