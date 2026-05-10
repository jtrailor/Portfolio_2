import { useRef } from 'react'

/**
 * Wrapper div that applies a 3D perspective tilt effect while the cursor is
 * over the card and smoothly resets when it leaves.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content rendered inside the card.
 * @param {string} [props.className] - Tailwind classes applied to the wrapper div.
 * @param {Function} [props.onClick] - Click handler forwarded to the wrapper div.
 * @param {Object} [props.style] - Inline styles forwarded to the wrapper div (e.g. transitionDelay).
 */
function TiltCard({ children, className = '', onClick, style }) {
  const cardRef = useRef(null)

  /**
   * Computes the cursor's normalized offset from the card center and applies a
   * rotateX/Y transform. Transition is disabled here so the card tracks the
   * cursor instantly without lag.
   * @param {React.MouseEvent} e
   */
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    // Disable transition while tracking the cursor so the card follows instantly.
    card.style.transition = 'none'
    card.style.transform = `perspective(800px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale3d(1.03,1.03,1.03)`
  }

  /**
   * Resets the card to its resting transform. Transition is re-enabled here so
   * the snap-back animates smoothly rather than jumping.
   */
  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    // Re-enable transition only on leave so the reset animates smoothly.
    card.style.transition = 'transform 0.4s ease'
    card.style.transform =
      'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      style={style}
    >
      {children}
    </div>
  )
}

export default TiltCard
