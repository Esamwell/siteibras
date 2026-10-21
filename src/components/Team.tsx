import { Users, Award, ShieldCheck, HeartHandshake } from 'lucide-react'
import './Team.css'

interface TeamGalleryItem {
  id: string
  image: string
  title: string
  role: string
  description: string
  tag: string
}

const teamItems: TeamGalleryItem[] = [
  {
    id: '1',
    image: '/equipe/diretoria-lideranca.jpg',
    title: 'Liderança & Articulação Institucional',
    role: 'Diretoria Executiva',
    description:
      'Lideranças comprometidas com a expansão de parcerias e a representação de causas sociais de interesse coletivo.',
    tag: 'Diretoria'
  },
  {
    id: '2',
    image: '/equipe/equipe-geral.jpg',
    title: 'Equipe Multidisciplinar IBRAS',
    role: 'Corpo Técnico & Colaboradores',
    description:
      'Profissionais dedicados ao planejamento, gestão participativa e execução de iniciativas de cidadania e inclusão.',
    tag: 'Equipe'
  },
  {
    id: '3',
    image: '/equipe/reuniao-planejamento.jpg',
    title: 'Governança & Planejamento Estratégico',
    role: 'Conselho & Gestão',
    description:
      'Reuniões de alinhamento contínuo para avaliação de diretrizes, conformidade estatutária e novos projetos.',
    tag: 'Planejamento'
  },
  {
    id: '4',
    image: '/equipe/painel-mundo-digital.jpg',
    title: 'Representação em Fóruns Nacionais',
    role: 'Conselho de Usuários & Inclusão',
    description:
      'Participação ativa em debates nacionais de inclusão social, telecomunicações e cidadania (Anatel / Ministério das Comunicações).',
    tag: 'Atuação Pública'
  }
]

export default function Team() {
  return (
    <section className="section team-section" id="equipe">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge--primary">
            <Users size={14} className="badge-icon" /> Pessoas que Fazem Acontecer
          </span>
          <h2 className="section-title">
            Nossa <span className="text-gradient">Diretoria & Equipe</span>
          </h2>
          <p className="section-subtitle">
            Conheça as pessoas engajadas na liderança e no dia a dia do IBRAS, unindo
            experiência, responsabilidade e paixão para transformar realidades em todo o Brasil.
          </p>
        </div>

        {/* Value Pills Bar */}
        <div className="team__highlights">
          <div className="team__highlight-pill">
            <Award size={18} />
            <span>Gestão Ética e Comprometida</span>
          </div>
          <div className="team__highlight-pill">
            <ShieldCheck size={18} />
            <span>Governança Democrática</span>
          </div>
          <div className="team__highlight-pill">
            <HeartHandshake size={18} />
            <span>Dedicação ao Impacto Social</span>
          </div>
        </div>

        {/* Team Grid */}
        <div className="team__grid">
          {teamItems.map((item) => (
            <div key={item.id} className="team-card">
              <div className="team-card__image-wrap">
                <img
                  src={item.image}
                  alt={item.title}
                  className="team-card__img"
                  loading="lazy"
                />
                <span className="team-card__tag">{item.tag}</span>
              </div>

              <div className="team-card__content">
                <span className="team-card__role">{item.role}</span>
                <h3 className="team-card__title">{item.title}</h3>
                <p className="team-card__description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
