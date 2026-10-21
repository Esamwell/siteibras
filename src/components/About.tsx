import { Target, Compass, Award, Heart, ArrowRight, Users } from 'lucide-react'
import { scrollToSection } from '../utils/navigation'
import './About.css'

const valuesList = [
  'Ética e transparência em todas as ações',
  'Solidariedade e compromisso público',
  'Respeito à dignidade humana',
  'Desenvolvimento comunitário sustentável',
  'Inclusão social e igualdade de oportunidades',
  'Participação popular e cidadania ativa'
]

const teamItems = [
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
  },
  {
    id: '5',
    image: '/equipe/bahia-estado-voluntario.jpg',
    title: 'Engajamento & Voluntariado Social',
    role: 'Ações Comunitárias & Cidadania',
    description:
      'Articulação e liderança em projetos de mobilização comunitária e no Programa Bahia Estado Voluntário (BEV).',
    tag: 'Voluntariado'
  }
]

export default function About() {
  return (
    <section id="sobre" className="section about-section" aria-labelledby="about-title">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge--primary">
            <Heart size={14} className="badge-icon" /> Nossa Identidade
          </span>
          <h2 className="section-title" id="about-title">
            Quem Somos & <span className="text-gradient">Nossa Atuação</span>
          </h2>
          <p className="section-subtitle">
            O <strong>IBRAS – Instituto Brasileiro de Atenção Social</strong> é uma organização
            da sociedade civil comprometida com a promoção da cidadania, inclusão social e
            fortalecimento da participação popular. Atuamos por meio de projetos sociais,
            ações comunitárias e iniciativas voltadas ao interesse público.
          </p>
        </div>

        {/* Two-column overview */}
        <div className="about__overview-grid">
          <div className="about__text-block">
            <h3>Trabalhamos para Conectar Pessoas e Transformar Realidades</h3>
            <p>
              Trabalhamos para conectar pessoas, transformar realidades e contribuir para uma sociedade
              mais justa, humana e solidária, fortalecendo comunidades e promovendo ações que gerem
              impacto social positivo e duradouro.
            </p>
            <p>
              Acreditamos que a transformação social acontece por meio da participação ativa da sociedade,
              do fortalecimento das comunidades e da construção de oportunidades para quem mais precisa.
            </p>

            <div className="about__values-list">
              {valuesList.map((val) => (
                <div key={val} className="about__val-item">
                  <div className="val-item__check">✓</div>
                  <span>{val}</span>
                </div>
              ))}
            </div>

            <div className="about__cta-row">
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => scrollToSection('projetos')}
              >
                <span>Conheça Nossos Projetos</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => scrollToSection('transparencia')}
              >
                <span>Portal da Transparência</span>
              </button>
            </div>
          </div>

          <div className="about__image-block">
            <div className="about__image-card">
              <div className="about__main-image-wrap">
                <img
                  src="/equipe/equipe-geral.jpg"
                  alt="Equipe do IBRAS reunida na sede em Salvador"
                  className="about__main-img"
                />
                <div className="about__stat-tag">
                  <span className="stat-tag__num">10+</span>
                  <span className="stat-tag__lbl">Anos de atuação institucional</span>
                </div>
              </div>

              <div className="about__image-caption">
                <div className="about__caption-header">
                  <strong className="about__caption-title">Equipe & Diretoria IBRAS</strong>
                  <span className="about__caption-badge">Salvador · BA</span>
                </div>
                <p className="about__caption-sub">
                  Compromisso público, governança e dedicação contínua à cidadania e inclusão social.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Missão, Visão e Valores (3 Cards da Página Original) */}
        <div className="about__mvv-grid">
          <div className="mvv-card">
            <div className="mvv-card__icon mvv-card__icon--missao">
              <Target size={26} />
            </div>
            <h3>Missão</h3>
            <p>
              Promover cidadania, inclusão social e participação popular por meio de projetos
              e ações de interesse coletivo.
            </p>
          </div>

          <div className="mvv-card">
            <div className="mvv-card__icon mvv-card__icon--visao">
              <Compass size={26} />
            </div>
            <h3>Visão</h3>
            <p>
              Ser uma instituição reconhecida pela seriedade, transparência e compromisso
              com o desenvolvimento social.
            </p>
          </div>

          <div className="mvv-card">
            <div className="mvv-card__icon mvv-card__icon--valores">
              <Award size={26} />
            </div>
            <h3>Valores</h3>
            <p>
              Ética, solidariedade, responsabilidade social, transparência, respeito à dignidade
              humana e compromisso público.
            </p>
          </div>
        </div>

        {/* Diretoria & Equipe Unificada na mesma seção */}
        <div className="about__team-section">
          <div className="about__team-header">
            <span className="badge badge--primary">
              <Users size={14} className="badge-icon" /> Nossa Liderança
            </span>
            <h3>Diretoria & Equipe IBRAS</h3>
            <p>
              Profissionais dedicados ao fortalecimento institucional, articulação comunitária
              e representação pública dos direitos do cidadão.
            </p>
          </div>

          <div className="about__team-grid">
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
                  <h4 className="team-card__title">{item.title}</h4>
                  <p className="team-card__description">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
