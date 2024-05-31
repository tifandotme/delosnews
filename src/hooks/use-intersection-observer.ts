import { useEffect } from "react"

type UseIntersectionObserverOptions = {
  enabled?: boolean
  onIntersect: () => void
  root?: React.RefObject<Element | null>
  rootMargin?: string
  target: React.RefObject<Element | null>
  threshold?: number | number[]
}

export function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = "0px",
  target,
  threshold = 0.1,
}: UseIntersectionObserverOptions) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      },
    )

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target?.current, enabled])
}
