import { useState, type FormEvent } from 'react'
import {
  Heart,
  Mail,
  Send,
  CheckCircle,
  ArrowUp,
  Shield,
  FileCheck,
  Lock
} from 'lucide-react'
import { scrollToSection } from '../utils/navigation'
import './Footer.css'

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletter = (e: FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setSubscribed(true)
    setTimeout(() => {
      setNewsletterEmail('')
    }, 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      {/* Wave decoration on top */}
      <div className="footer__wave" aria-hidden="true">
        <svg viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none">
          <path
            d="M0,32L80,42.7C160,53,320,75,480,69.3C640,64,800,32,960,26.7C1120,21,1280,43,1360,53.3L1440,64L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="container">
        {/* Top Newsletter Bar */}
        <div className="footer__newsletter-card">
          <div className="newsletter-card__content">
            <div className="newsletter-card__badge">
              <Mail size={14} /> Fique por Dentro
            </div>
            <h3>Receba Nossas Histórias de Impacto</h3>
            <p>
              Assine nosso boletim informativo mensal com novidades dos projetos, eventos e
              relatórios de prestação de contas. Sem spam.
            </p>
          </div>

          <div className="newsletter-card__form">
            {subscribed ? (
              <div className="newsletter-card__success">
                <CheckCircle size={20} />
                <span>Obrigado! Você agora faz parte da nossa rede.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="newsletter-form">
                <input
                  type="email"
                  required
                  placeholder="Seu melhor e-mail..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  aria-label="E-mail para newsletter"
                />
                <button type="submit" className="btn btn--primary" aria-label="Inscrever-se">
                  <span>Inscrever</span>
                  <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links Grid */}
        <div className="footer__grid">
          {/* Brand Info */}
          <div className="footer__brand">
            <button
              type="button"
              className="footer__logo"
              onClick={() => scrollToSection('inicio')}
              aria-label="IBRAS - Voltar ao início"
            >
              <img
                src="/logo-ibras.png"
                alt="Logo Oficial IBRAS"
                className="footer__logo-img"
              />
              <div className="footer__logo-text-wrap">
                <span className="logo-name">IBRAS</span>
                <span className="logo-sub">Instituto Brasileiro de Atenção Social</span>
              </div>
            </button>
            <p className="footer__mission">
              O IBRAS é uma organização da sociedade civil comprometida com a promoção da cidadania,
              inclusão social e fortalecimento da participação popular. Conectando pessoas e transformando realidades.
            </p>

            <div className="footer__compliance-badges">
              <span className="compliance-tag">
                <Shield size={13} /> CNPJ: 30.285.883/0001-94
              </span>
              <span className="compliance-tag">
                <FileCheck size={13} /> RCPJ Salvador: nº 52.570
              </span>
            </div>

            <div className="footer__socials">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do IBRAS"
                className="social-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn do IBRAS"
                className="social-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect width="4" height="12" x="2" y="9"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook do IBRAS"
                className="social-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube do IBRAS"
                className="social-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
                  <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Navegação */}
          <div className="footer__col">
            <h4 className="footer__title">Navegação</h4>
            <ul className="footer__links">
              <li><button type="button" onClick={() => scrollToSection('inicio')}>Início</button></li>
              <li><button type="button" onClick={() => scrollToSection('pilares')}>Nossos Pilares</button></li>
              <li><button type="button" onClick={() => scrollToSection('sobre')}>Quem Somos & Diretoria</button></li>
              <li><button type="button" onClick={() => scrollToSection('projetos')}>Projetos & Parcerias</button></li>
              <li><button type="button" onClick={() => scrollToSection('noticias')}>Notícias & Eventos</button></li>
              <li><button type="button" onClick={() => scrollToSection('transparencia')}>Portal da Transparência</button></li>
              <li><button type="button" onClick={() => scrollToSection('contato')}>Fale Conosco</button></li>
            </ul>
          </div>

          {/* Column 2: Transparência */}
          <div className="footer__col">
            <h4 className="footer__title">Transparência</h4>
            <ul className="footer__links">
              <li><button type="button" onClick={() => scrollToSection('transparencia')}>Informações Institucionais</button></li>
              <li><button type="button" onClick={() => scrollToSection('transparencia')}>Estatuto Social Registrado</button></li>
              <li><button type="button" onClick={() => scrollToSection('transparencia')}>Cartão CNPJ Regular</button></li>
              <li><button type="button" onClick={() => scrollToSection('transparencia')}>Registro Civil das PJ</button></li>
              <li><button type="button" onClick={() => scrollToSection('transparencia')}>Conformidade LGPD</button></li>
              <li><button type="button" onClick={() => scrollToSection('contato')}>Atendimento Digital</button></li>
            </ul>
          </div>

          {/* Column 3: Parcerias */}
          <div className="footer__col">
            <h4 className="footer__title">Parcerias</h4>
            <ul className="footer__links">
              <li><button type="button" onClick={() => scrollToSection('projetos')}>Cidadania & Participação Social</button></li>
              <li><button type="button" onClick={() => scrollToSection('projetos')}>Inclusão Social</button></li>
              <li><button type="button" onClick={() => scrollToSection('projetos')}>Projetos Comunitários</button></li>
              <li><button type="button" onClick={() => scrollToSection('projetos')}>Ações Educativas & Culturais</button></li>
              <li><button type="button" onClick={() => scrollToSection('projetos')}>Convênios & Acordos MROSC</button></li>
              <li><button type="button" onClick={() => scrollToSection('contato')}>Propor Nova Parceria</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__legal">
            <p>
              <strong>IBRAS – CNPJ: 30.285.883/0001-94 | E-mail: contato@ibrasinstituto.org</strong>
            </p>
            <p className="footer__sublegal">
              Sede: Rua dos Rádioamadores, 73 - Pituaçu, Salvador - BA, CEP 41741-080
            </p>
            <p className="footer__sublegal">
              © 2014–2026. IBRAS – Instituto Brasileiro de Atenção Social. Todos os direitos reservados.
              {' · '}
              <a
                href="/admin"
                className="footer__admin-link"
                title="Acesso ao Painel Administrativo"
              >
                <Lock size={11} /> Painel Administrativo
              </a>
            </p>
          </div>

          <div className="footer__made-with">
            <span>
              Desenvolvido com <Heart size={14} className="heart-icon" /> e propósito social
            </span>
            <button
              onClick={scrollToTop}
              className="footer__back-to-top"
              aria-label="Voltar ao topo da página"
            >
              <span>Topo</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
