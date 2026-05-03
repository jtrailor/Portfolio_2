import { useState, useEffect } from 'react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import profilePhoto from '../images/profile-photo.jpg'
import sunglasses from '../images/sunnies.png'

const phrases = [
  'I build mission-critical defense systems.',
  'I lead engineering teams.',
  'I write software that flies.',
  "I'm an aerospace software engineer.",
]

function useTypewriter(phrases) {
  const [display, setDisplay] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fullPhrase = phrases[phraseIndex]
    const isComplete = !isDeleting && display === fullPhrase
    const isEmpty = isDeleting && display === ''

    if (isComplete) {
      const t = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(t)
    }
    if (isEmpty) {
      setIsDeleting(false)
      setPhraseIndex((i) => (i + 1) % phrases.length)
      return
    }

    const t = setTimeout(
      () => setDisplay(
        isDeleting
          ? fullPhrase.slice(0, display.length - 1)
          : fullPhrase.slice(0, display.length + 1)
      ),
      isDeleting ? 30 : 65
    )
    return () => clearTimeout(t)
  }, [display, isDeleting, phraseIndex, phrases])

  return display
}

function Intro() {
  const [showSunglasses, setShowSunglasses] = useState(false)
  const typedText = useTypewriter(phrases)

  return (
    <section
      id="intro"
      className="min-h-screen px-8 py-20 flex items-center justify-center"
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">

        {/* Left — text content */}
        <div className="flex-1 min-w-0 flex flex-col items-center md:items-start text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold mb-4">Hi, I'm Jon.</h1>

          <p className="text-lg sm:text-2xl mb-6 min-h-[2rem]">
            {typedText}
            <span className="cursor-blink ml-0.5">|</span>
          </p>

          <p className="text-base md:text-lg text-gray-800 leading-relaxed mb-8 max-w-lg">
            Senior software engineer at General Dynamics Mission Systems, where I build
            reliable systems for aerospace and defense. I work across the full stack —
            from low-level C++ for underwater robotics to leading engineering teams and
            designing AI validation strategies.
          </p>

          <div className="flex items-center gap-6">
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
        </div>

        {/* Right — photo */}
        <div
          className="relative w-52 sm:w-72 shrink-0 mx-auto cursor-pointer"
          onClick={() => setShowSunglasses(!showSunglasses)}
        >
          <img
            src={profilePhoto}
            alt="Jon"
            className="w-full rounded-full object-cover"
          />
          {showSunglasses && (
            <img
              src={sunglasses}
              alt="Sunglasses"
              className="absolute top-[16%] left-1/2 -translate-x-1/2 w-1/2 h-auto pointer-events-none"
            />
          )}
        </div>

      </div>
    </section>
  )
}

export default Intro
