import { ArrowDown, ArrowRight, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { scrollToSection } from '../utils/navigation'
import './Hero.css'

export default function Hero() {

  return (
    <section id="inicio" className="hero" aria-label="Seção principal">
      {/* Dynamic Animated Background with Ambient Video & Light Mesh */}
      <div className="hero__bg" aria-hidden="true">
        <video
          className="hero__video"
          src="/bgvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero__video-overlay" />
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid-pattern" />
        <div className="hero__glow-center" />
      </div>

      <div className="container hero__inner">


        {/* Central Official Logo with Gentle Float */}
        <div className="hero__logo-wrapper">
          <img
            src="/logo-ibras.png"
            alt="Logotipo do IBRAS - Instituto Brasileiro de Atenção Social"
            className="hero__logo-img"
          />
        </div>

        {/* Headline */}
        <h1 className="hero__title">
          Conectando Pessoas.{' '}
          <span className="hero__title-gradient">Transformando Realidades.</span>
        </h1>

        {/* Subtitle from original site */}
        <p className="hero__subtitle">
          O <strong>IBRAS</strong> é uma organização da sociedade civil comprometida com a promoção da
          cidadania, inclusão social e fortalecimento da participação popular. Por meio de projetos,
          ações comunitárias e iniciativas de interesse público, conectamos pessoas e construímos uma
          sociedade mais justa, humana e solidária.
        </p>

        {/* Action Buttons */}
        <div className="hero__actions">
          <button
            type="button"
            className="btn btn--hero-primary"
            onClick={() => scrollToSection('projetos')}
          >
            <span>Conheça Nossos Projetos</span>
            <ArrowRight size={18} className="btn-arrow" />
          </button>

          <button
            type="button"
            className="btn btn--hero-secondary"
            onClick={() => scrollToSection('sobre')}
          >
            <Users size={18} />
            <span>Saiba Mais Sobre o IBRAS</span>
          </button>
        </div>

        {/* 3 Minimalist Highlights Bar */}
        <div className="hero__features">
          <div className="hero__feature-card">
            <div className="feature-card__icon">
              <Users size={20} />
            </div>
            <div>
              <strong>Cidadania & Direitos</strong>
              <span>Fortalecimento da participação popular e social</span>
            </div>
          </div>

          <div className="hero__feature-card">
            <div className="feature-card__icon">
              <Sparkles size={20} />
            </div>
            <div>
              <strong>Inclusão Social</strong>
              <span>Oportunidades e desenvolvimento humano comunitário</span>
            </div>
          </div>

          <div className="hero__feature-card">
            <div className="feature-card__icon">
              <ShieldCheck size={20} />
            </div>
            <div>
              <strong>Interesse Público</strong>
              <span>Atuação pautada pela ética, transparência e legalidade</span>
            </div>
          </div>
        </div>
      </div>

      {/* Smooth Scroll Indicator */}
      <button
        type="button"
        className="hero__scroll-down"
        onClick={() => scrollToSection('pilares')}
        aria-label="Rolar para a próxima seção"
      >
        <span>Saiba Mais</span>
        <ArrowDown size={15} />
      </button>
    </section>
  )
}
