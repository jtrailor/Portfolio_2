import {
  Header,
  Intro,
  Experience,
  Projects,
  Skills,
  Contact,
  Footer,
} from './components'

function App() {
  return (
    <div>
      <Header />
      <div>
        <Intro />
        <div className="bg-white/15">
          <Experience />
        </div>
        <Projects />
        <div className="bg-white/15">
          <Skills />
        </div>
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default App
