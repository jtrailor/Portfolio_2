import { useState } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import profilePhoto from '../images/profile-photo.jpg'
import sunglasses from '../images/sunnies.png'

function Intro() {
  const [showSunglasses, setShowSunglasses] = useState(false)

  const toggleSunglasses = () => setShowSunglasses(!showSunglasses)

  return (
    <section
      id="intro"
      className="min-h-screen p-8 flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold mb-4">Hi I'm Jon</h1>
      <p className="text-2xl mb-6">I'm an aerospace software engineer!</p>

      {/* Image container - w/h must be in 4 step increments */}
      <div
        className="relative w-72 cursor-pointer"
        onClick={toggleSunglasses}
      >
        <img
          src={profilePhoto}
          alt="Jon"
          className="w-full rounded-full object-cover"
        />

        {/* Sunglasses overlay */}
        {showSunglasses && (
          <img
            src={sunglasses}
            alt="Sunglasses"
            className="absolute top-[21%] left-[27%] w-1/2 h-auto pointer-events-none"
          />
        )}
      </div>

      <div className="flex items-center gap-6 mt-6">
        <a
          href="https://www.linkedin.com/in/jonathantrailor/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="w-10 h-10 text-brand-dark_blue hover:text-brand-orange transition-colors duration-300" />
        </a>
        <a
          href="https://github.com/jtrailor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-10 h-10 text-brand-dark_blue hover:text-brand-orange transition-colors duration-300" />
        </a>
        <a
          href="/resume.pdf"
          download
          className="bg-brand-dark_blue text-white px-6 py-2 rounded-full font-semibold hover:bg-brand-orange transition-colors duration-300"
        >
          Download Resume
        </a>
      </div>
    </section>
  )
}

export default Intro
