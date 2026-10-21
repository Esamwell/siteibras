import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { scrollToSection } from '../utils/navigation'
import './Navbar.css'

const links = [
  { targetId: 'inicio', label: 'Início' },
  { targetId: 'pilares', label: 'Pilares' },
  { targetId: 'sobre', label: 'Quem Somos' },
  { targetId: 'projetos', label: 'Projetos' },
  { targetId: 'noticias', label: 'Notícias' },
  { targetId: 'transparencia', label: 'Transparência' },
  { targetId: 'contato', label: 'Contato' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    // If user arrived with a hash, remove it cleanly
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search)
    }

    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (targetId: string) => {
    setActive(targetId)
    setOpen(false)
    scrollToSection(targetId)
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="container navbar__inner">
        {/* Logo in High Evidence (No redundant text clutter) */}
        <button
          type="button"
          className="navbar__logo"
          onClick={() => handleNavClick('inicio')}
          aria-label="IBRAS - Ir para o início"
        >
          <img
            src="/logo-ibras.png"
            alt="Logo IBRAS - Instituto Brasileiro de Atenção Social"
            className="navbar__logo-image"
          />
        </button>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Menu principal">
          {links.map((link) =>
            link.targetId === 'noticias' ? (
              <a
                key="noticias"
                href="/noticias"
                className="navbar__link"
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.targetId}
                type="button"
                className={`navbar__link ${active === link.targetId ? 'navbar__link--active' : ''}`}
                onClick={() => handleNavClick(link.targetId)}
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* Harmonious Compact CTA */}
        <div className="navbar__action">
          <button
            type="button"
            className="navbar__cta-btn"
            onClick={() => handleNavClick('contato')}
          >
            Fale Conosco
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="navbar__toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-nav"
        className={`navbar__mobile ${open ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!open}
      >
        <nav>
          {links.map((link) =>
            link.targetId === 'noticias' ? (
              <a
                key="noticias"
                href="/noticias"
                className="navbar__mobile-link"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ) : (
              <button
                key={link.targetId}
                type="button"
                className="navbar__mobile-link"
                onClick={() => handleNavClick(link.targetId)}
              >
                {link.label}
              </button>
            )
          )}
          <button
            type="button"
            className="btn btn--primary"
            style={{ marginTop: '0.75rem', width: '100%', justifyContent: 'center' }}
            onClick={() => handleNavClick('contato')}
          >
            Fale Conosco
          </button>
        </nav>
      </div>
    </header>
  )
}
