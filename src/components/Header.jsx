import React from 'react'

function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark_blue text-white p-4">
      <nav className="container mx-auto flex justify-between text-xl">
        <a href="#intro" className="hover:underline">
          Jon Trailor
        </a>
        <a href="#experience" className="hover:underline">
          Experience
        </a>
        <a href="#projects" className="hover:underline">
          Projects
        </a>
        <a href="#skills" className="hover:underline">
          Skills
        </a>
        <a href="#contact" className="hover:underline">
          Contact
        </a>
      </nav>
    </header>
  )
}

export default Header
