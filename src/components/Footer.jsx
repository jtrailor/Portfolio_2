import { FaLinkedin, FaGithub } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-brand-dark_blue dark:bg-gray-900 text-white py-8 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} Jon Trailor. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.linkedin.com/in/jonathantrailor/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-5 h-5 hover:text-brand-orange transition-colors duration-300" />
          </a>
          <a
            href="https://github.com/jtrailor"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="w-5 h-5 hover:text-brand-orange transition-colors duration-300" />
          </a>
          <a
            href="/resume.pdf"
            download
            className="text-sm hover:text-brand-orange transition-colors duration-300"
          >
            Resume
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
