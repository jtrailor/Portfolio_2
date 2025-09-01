import React from 'react';
import { Header, Intro, Experience, Projects, Skills, Contact } from './components';


function App() {
  return (
    <div>
      <Header />
      <div>
        <Intro />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;
