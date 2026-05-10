import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

/**
 * Provides dark/light theme state to the component tree.
 * On first visit the theme defaults to the OS preference; subsequent visits
 * restore the explicit user choice from localStorage.
 * Toggles the `dark` class on <html> whenever the theme changes so Tailwind's
 * `dark:` variants activate globally.
 * @param {Object} props
 * @param {React.ReactNode} props.children - Components that will consume the theme context.
 */
export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    // Explicit user preference takes priority; fall back to OS setting on first visit.
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * Returns the current theme state and toggle function from ThemeContext.
 * @returns {{ dark: boolean, toggle: Function }} Theme state and toggle callback.
 */
export const useTheme = () => useContext(ThemeContext)
