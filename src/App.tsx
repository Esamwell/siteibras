import { useEffect } from 'react'
import './index.css'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Pillars from './components/Pillars'
import About from './components/About'
import Projects from './components/Projects'
import News from './components/News'
import Transparency from './components/Transparency'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  // Reset page title when returning from /admin or /noticias
  useEffect(() => {
    document.title = 'IBRAS – Instituto Brasileiro de Atenção Social'
  }, [])

  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Pillars />
        <About />
        <Projects />
        <News />
        <Transparency />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
