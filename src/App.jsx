import React from 'react';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Projects from './components/projects/Projects';
import Education from './components/education/Education';
import Awards from './components/awards/Awards';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import ThemeToggle from './components/common/ThemeToggle';
import './index.css';

function App() {
  return (
    <div className="App">
      <ThemeToggle />
      <Hero />
      <About />
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
