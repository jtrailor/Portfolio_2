import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

// Must match scroll-padding-top in index.css so programmatic scrolls
// land at the same position as native anchor scrolls.
const HEADER_OFFSET = 30

/**
 * Fixed navigation bar with active section highlighting and a dark mode toggle.
 * Renders a full link row on desktop and a collapsible hamburger menu on mobile.
 */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('intro')
  const { dark, toggle } = useTheme()

  const close = () => setMenuOpen(false)

  // Highlight the nav link whose section occupies the upper 40% of the viewport.
  // Scroll-based (vs. IntersectionObserver-at-mount) so it works with lazy-loaded
  // sections that aren't in the DOM when the Header first mounts.
  useEffect(() => {
    const sectionIds = ['intro', 'experience', 'projects', 'skills', 'contact']

    /**
     * Reads scroll position and sets activeSection to the last section whose
     * top edge is within the upper 40% of the viewport.
     */
    const handleScroll = () => {
      const threshold = window.scrollY + window.innerHeight * 0.4
      let current = 'intro'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= threshold) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /**
   * Returns Tailwind classes for a nav link, adding the active highlight color
   * when the link's section is currently in view.
   * @param {string} id - The section id this link points to.
   * @returns {string} Space-separated Tailwind class string.
   */
  const navClass = (id) =>
    `hover:underline transition-colors duration-200 ${
      activeSection === id ? 'text-brand-orange' : ''
    }`

  /**
   * Returns a click handler that closes the mobile menu and smoothly scrolls to
   * the given section. Uses a double rAF to wait for React to flush the
   * menu-close re-render before computing the scroll target — without this the
   * open dropdown's height skews getBoundingClientRect and the page lands too high.
   * @param {string} id - The target section's id attribute.
   * @returns {Function} Click event handler.
   */
  const navigateTo = (id) => (e) => {
    e.preventDefault()
    close()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (!el) return
        const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
      })
    })
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark_blue dark:bg-gray-900 text-white">
      <nav className="container mx-auto flex justify-between items-center text-xl p-4">
        <a href="#intro" className="hover:underline" onClick={close}>
          Jon Trailor
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="#experience" className={navClass('experience')}>Experience</a>
          <a href="#projects" className={navClass('projects')}>Projects</a>
          <a href="#skills" className={navClass('skills')}>Skills</a>
          <a href="#contact" className={navClass('contact')}>Contact</a>
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="hover:text-brand-orange transition-colors duration-300"
          >
            {dark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>
          <a
            href="/resume.pdf"
            download
            className="bg-brand-orange px-4 py-1 rounded-full font-semibold hover:bg-opacity-80 transition-colors duration-300"
          >
            Resume
          </a>
        </div>

        {/* Hamburger + dark mode toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="hover:text-brand-orange transition-colors duration-300"
          >
            {dark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-dark_blue dark:bg-gray-900 border-t border-white/20 px-6 pt-5 pb-6 flex flex-col gap-5 text-xl">
          <a href="#experience" className={navClass('experience')} onClick={navigateTo('experience')}>Experience</a>
          <a href="#projects" className={navClass('projects')} onClick={navigateTo('projects')}>Projects</a>
          <a href="#skills" className={navClass('skills')} onClick={navigateTo('skills')}>Skills</a>
          <a href="#contact" className={navClass('contact')} onClick={navigateTo('contact')}>Contact</a>
          <a
            href="/resume.pdf"
            download
            className="bg-brand-orange text-center px-4 py-2 rounded-full font-semibold hover:bg-opacity-80 transition-colors duration-300"
            onClick={close}
          >
            Resume
          </a>
        </div>
      )}
    </header>
  )
}

export default Header
