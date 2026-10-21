import { useState, useEffect } from 'react'
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
import AdminNewsModal from './components/AdminNewsModal'

function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false)

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
        <News onOpenAdmin={() => setIsAdminOpen(true)} />
        <Transparency />
        <Contact />
      </main>
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Secure Admin Management Modal */}
      <AdminNewsModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  )
}

export default App
