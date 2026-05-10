import { useEffect, useRef, useState } from 'react'

/**
 * Observes an element and returns whether it has entered the viewport.
 * The observer disconnects after the first intersection — animations triggered
 * by this hook are intentionally one-shot and do not re-fire on scroll-back.
 * @param {number} [threshold=0.15] - Fraction of the element that must be visible to trigger.
 * @returns {[React.RefObject, boolean]} Tuple of [ref to attach to the element, inView flag].
 */
export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, inView]
}
