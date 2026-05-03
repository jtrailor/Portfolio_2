import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const close = () => setMenuOpen(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark_blue text-white">
      <nav className="container mx-auto flex justify-between items-center text-xl p-4">
        <a href="#intro" className="hover:underline" onClick={close}>
          Jon Trailor
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#skills" className="hover:underline">Skills</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <a
            href="/resume.pdf"
            download
            className="bg-brand-orange px-4 py-1 rounded-full font-semibold hover:bg-opacity-80 transition-colors duration-300"
          >
            Resume
          </a>
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen
            ? <FaTimes className="w-6 h-6" />
            : <FaBars className="w-6 h-6" />
          }
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-brand-dark_blue border-t border-white/20 px-6 pb-6 flex flex-col gap-5 text-xl">
          <a href="#experience" className="hover:underline" onClick={close}>Experience</a>
          <a href="#projects" className="hover:underline" onClick={close}>Projects</a>
          <a href="#skills" className="hover:underline" onClick={close}>Skills</a>
          <a href="#contact" className="hover:underline" onClick={close}>Contact</a>
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
