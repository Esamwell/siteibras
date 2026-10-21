/**
 * Helper to smoothly scroll to any element on the page
 * without leaving any '#' hash in the browser address bar.
 */
export function scrollToSection(targetId: string) {
  const cleanId = targetId.startsWith('#') ? targetId.slice(1) : targetId
  const element = document.getElementById(cleanId)

  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }

  // Ensure address bar remains clean without '#...'
  if (window.location.hash) {
    window.history.replaceState(null, '', window.location.pathname + window.location.search)
  }
}
