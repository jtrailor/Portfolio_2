import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'

const HEADER_OFFSET = 30

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('intro')
  const { dark, toggle } = useTheme()

  const close = () => setMenuOpen(false)

  useEffect(() => {
    const sectionIds = ['intro', 'experience', 'projects', 'skills', 'contact']
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

  const navClass = (id) =>
    `hover:underline transition-colors duration-200 ${
      activeSection === id ? 'text-brand-orange' : ''
    }`

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

        {/* Hamburger + toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label="Toggle dark mode"
            className="hover:text-brand-orange transition-colors duration-300"
          >
            {dark ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen
              ? <FaTimes className="w-6 h-6" />
              : <FaBars className="w-6 h-6" />
            }
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
