import {
  Users,
  Heart,
  Building,
  GraduationCap,
  ShieldCheck,
  CheckCircle,
  FileSignature,
  ArrowRight,
  Handshake,
  AlertCircle
} from 'lucide-react'
import { scrollToSection } from '../utils/navigation'
import './Projects.css'

const partnershipAreas = [
  {
    icon: Users,
    title: 'Cidadania e Participação Social',
    description:
      'Iniciativas voltadas ao fortalecimento da participação popular, conselhos e ao exercício pleno da cidadania.'
  },
  {
    icon: Heart,
    title: 'Inclusão Social',
    description:
      'Ações destinadas à promoção da inclusão, desenvolvimento humano e fortalecimento comunitário continuado.'
  },
  {
    icon: Building,
    title: 'Projetos Comunitários de Interesse Público',
    description:
      'Iniciativas voltadas à melhoria das condições de vida e ao atendimento de demandas sociais e coletivas.'
  },
  {
    icon: GraduationCap,
    title: 'Ações Educativas, Culturais e Sociais',
    description:
      'Iniciativas que promovam conhecimento, cidadania, integração comunitária e valorização humana.'
  }
]

const differentials = [
  {
    title: 'Compromisso Social',
    description: 'Foco irrestrito na promoção do bem comum e na defesa do interesse público.'
  },
  {
    title: 'Gestão Transparente',
    description: 'Atuação pautada pela ética, conformidade legal, compliance e prestação de contas.'
  },
  {
    title: 'Foco em Resultados',
    description: 'Busca por impacto social positivo, métricas reais e sustentabilidade das ações.'
  },
  {
    title: 'Parcerias Estruturadas',
    description: 'Capacidade técnica e administrativa para formalização com setores público e privado.'
  }
]

const partnershipModels = [
  'Convênios Públicos e Privados',
  'Termos de Colaboração (MROSC)',
  'Termos de Fomento',
  'Acordos de Cooperação Técnica',
  'Apoio Institucional',
  'Captação de Recursos & Doações'
]

export default function Projects() {
  return (
    <section className="section projects-section" id="projetos">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge--primary">
            <Handshake size={14} className="badge-icon" /> Parcerias Estratégicas
          </span>
          <h2 className="section-title">
            Projetos, Parcerias & <span className="text-gradient">Captação de Apoio</span>
          </h2>
          <p className="section-subtitle">
            O <strong>IBRAS</strong> atua na promoção da cidadania, inclusão social e
            fortalecimento da participação popular. O Instituto está preparado para desenvolver,
            apoiar e participar de iniciativas de interesse público em cooperação com organizações,
            empresas, poder público e a sociedade civil.
          </p>
        </div>

        {/* Status Atual dos Projetos (Conforme Site Oficial) */}
        <div className="projects__status-banner">
          <div className="status-banner__icon">
            <AlertCircle size={24} />
          </div>
          <div className="status-banner__content">
            <h3>Status Atual dos Projetos</h3>
            <p>
              No momento, o IBRAS não possui projetos em execução com recursos públicos ou em fase de captação ativa.
              Esta seção é destinada a apresentar futuras iniciativas sociais, comunitárias e institucionais
              desenvolvidas, apoiadas ou realizadas em parceria pelo Instituto.
            </p>
          </div>
        </div>

        {/* Áreas para Construção de Parcerias */}
        <div className="projects__areas-block">
          <div className="projects__block-header">
            <h3>Áreas para Construção de Parcerias</h3>
            <p>Eixos temáticos prioritários para desenvolvimento conjunto de projetos sociais:</p>
          </div>

          <div className="projects__areas-grid">
            {partnershipAreas.map((area) => {
              const Icon = area.icon
              return (
                <div key={area.title} className="area-card">
                  <div className="area-card__icon">
                    <Icon size={24} />
                  </div>
                  <h4>{area.title}</h4>
                  <p>{area.description}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Diferenciais do IBRAS */}
        <div className="projects__differentials-block">
          <div className="projects__block-header">
            <h3>Diferenciais do IBRAS para Parcerias</h3>
            <p>Pilares de governança que asseguram segurança jurídica e efetividade:</p>
          </div>

          <div className="projects__diff-grid">
            {differentials.map((diff) => (
              <div key={diff.title} className="diff-card">
                <div className="diff-card__check">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h4>{diff.title}</h4>
                  <p>{diff.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modelos de Parceria e Apoio */}
        <div className="projects__models-card">
          <div className="models-card__content">
            <div className="models-card__badge">
              <FileSignature size={14} /> Modalidades Formais
            </div>
            <h3>Modelos de Parceria e Apoio Institucional</h3>
            <p>
              Estamos aptos a formalizar instrumentos de parceria em conformidade com o Marco Regulatório
              das Organizações da Sociedade Civil (Lei Federal nº 13.019/2014) e legislações correlatas.
            </p>

            <div className="models-grid">
              {partnershipModels.map((model) => (
                <div key={model} className="model-pill">
                  <CheckCircle size={15} className="model-pill__check" />
                  <span>{model}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="models-card__action">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => scrollToSection('contato')}
            >
              <span>Propor uma Parceria</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
