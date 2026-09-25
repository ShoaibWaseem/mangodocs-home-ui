import { useEffect, useRef, useState } from 'react'

// Fires once when the element is 100px inside the viewport, then stops
// watching — a scroll reveal that replays on every scroll-by fights the reader.
export function useInViewOnce<T extends Element>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -100px 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}
