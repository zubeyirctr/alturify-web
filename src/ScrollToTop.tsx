import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// react-router keeps the browser's scroll position across route changes;
// for a set of otherwise-unrelated pages we want every navigation to start
// at the top instead.
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
