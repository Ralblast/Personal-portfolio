import React from 'react';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Education from './components/education/Education';
import Awards from './components/awards/Awards';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import Header from './components/common/Header';
import Spotlight from './components/common/Spotlight';
import Intro from './components/common/Intro';
import Particles from './components/common/Particles';
import Meteors from './components/common/Meteors';
import './index.css';

function App() {
  return (
    <div className="App">
      <Intro />
      <Particles />
      <Meteors />
      <Spotlight />
      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
