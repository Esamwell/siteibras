import { Users, Heart, Building2 } from 'lucide-react'
import './Pillars.css'

const pillars = [
  {
    icon: Users,
    title: 'Cidadania',
    description:
      'Fortalecimento da participação social e do exercício pleno dos direitos de cada cidadão brasileiro, garantindo voz e vez a todos.',
    color: '#1d6fce',
  },
  {
    icon: Heart,
    title: 'Inclusão Social',
    description:
      'Promoção de oportunidades, desenvolvimento humano e fortalecimento comunitário para quem mais precisa de apoio.',
    color: '#0d9488',
  },
  {
    icon: Building2,
    title: 'Interesse Público',
    description:
      'Atuação voltada ao bem coletivo, à transparência e à transformação social com responsabilidade e ética institucional.',
    color: '#7c3aed',
  },
]

export default function Pillars() {
  return (
    <section className="section pillars" id="pilares" aria-label="Nossos Pilares">
      <div className="container">
        <div className="section-header text-center">
          <div className="section-label">Nossa Missão</div>
          <h2 className="section-title">Nossos Pilares</h2>
          <div className="section-divider section-divider--center" />
          <p className="section-subtitle" style={{ marginInline: 'auto' }}>
            Três pilares fundamentais guiam todas as nossas ações e projetos sociais
          </p>
        </div>

        <div className="pillars__grid">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <article key={pillar.title} className="pillar-card" style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}>
                <div className="pillar-card__icon" style={{ background: pillar.color }}>
                  <Icon size={26} color="white" />
                </div>
                <h3 className="pillar-card__title">{pillar.title}</h3>
                <p className="pillar-card__desc">{pillar.description}</p>
                <div className="pillar-card__line" style={{ background: pillar.color }} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
