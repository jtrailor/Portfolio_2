import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Intro from './components/Intro'

// Below-fold sections are code-split so their JS is only downloaded when needed.
const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

/**
 * Root component. Composes the full page layout and wraps everything in
 * ThemeProvider so dark mode state is available to the entire tree.
 */
function App() {
  return (
    <ThemeProvider>
      <div className="dark:text-gray-100">
        <Header />
        {/* Intro is eagerly loaded and must live outside Suspense — if it were
            inside, React would hide it while any lazy sibling is still loading. */}
        <Intro />
        <Suspense fallback={null}>
          <div className="bg-white/15 dark:bg-white/5">
            <Experience />
          </div>
          <Projects />
          <div className="bg-white/15 dark:bg-white/5">
            <Skills />
          </div>
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default App
