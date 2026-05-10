import { lazy, Suspense } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Intro from './components/Intro'

const Experience = lazy(() => import('./components/Experience'))
const Projects = lazy(() => import('./components/Projects'))
const Skills = lazy(() => import('./components/Skills'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <ThemeProvider>
      <div className="dark:text-gray-100">
        <Header />
        <Suspense fallback={null}>
          <div>
            <Intro />
            <div className="bg-white/15 dark:bg-white/5">
              <Experience />
            </div>
            <Projects />
            <div className="bg-white/15 dark:bg-white/5">
              <Skills />
            </div>
            <Contact />
          </div>
          <Footer />
        </Suspense>
      </div>
    </ThemeProvider>
  )
}

export default App
