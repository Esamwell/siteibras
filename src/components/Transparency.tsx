import {
  Calendar,
  FileBadge,
  Building,
  ScrollText,
  ShieldCheck,
  Info,
  Clock,
  ArrowRight
} from 'lucide-react'
import { scrollToSection } from '../utils/navigation'
import './Transparency.css'

export default function Transparency() {

  return (
    <section className="section transparency-section" id="transparencia">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge--primary">
            <ShieldCheck size={14} className="badge-icon" /> Governança & Prestação de Contas
          </span>
          <h2 className="section-title">
            Portal da <span className="text-gradient">Transparência</span>
          </h2>
          <p className="section-subtitle">
            O IBRAS acredita que a transparência é um dos pilares para fortalecer a confiança
            da sociedade. Reunimos informações institucionais e dados públicos da entidade,
            reafirmando nosso compromisso com a ética, a responsabilidade e o interesse público.
          </p>
        </div>

        {/* Compromisso com a Transparência */}
        <div className="transparency__commitment-card">
          <h3>Compromisso com a Transparência</h3>
          <p>
            O Instituto Brasileiro de Atenção Social atua pautado pelos princípios da legalidade,
            ética, responsabilidade e transparência. As informações disponibilizadas neste portal
            refletem a situação institucional do IBRAS e serão atualizadas sempre que houver alterações relevantes.
          </p>
        </div>

        {/* Informações Institucionais do IBRAS (Exatas do Site Oficial) */}
        <div className="transparency__info-grid">
          <div className="info-card">
            <div className="info-card__icon">
              <Calendar size={22} />
            </div>
            <h3>Fundação & Sede</h3>
            <div className="info-card__highlight">13 de maio de 2014</div>
            <p>Rua dos Rádioamadores, 73 - Pituaçu, Salvador - BA, CEP 41741-080. Ações em prol da cidadania e inclusão.</p>
          </div>

          <div className="info-card">
            <div className="info-card__icon">
              <FileBadge size={22} />
            </div>
            <h3>Registro Civil</h3>
            <div className="info-card__highlight">Registro nº 52.570</div>
            <p>Registrado sob o nº 52.570 no 2º Registro Civil das Pessoas Jurídicas de Salvador/BA.</p>
          </div>

          <div className="info-card">
            <div className="info-card__icon">
              <Building size={22} />
            </div>
            <h3>CNPJ</h3>
            <div className="info-card__highlight">30.285.883/0001-94</div>
            <p>Cadastro Nacional da Pessoa Jurídica do Instituto Brasileiro de Atenção Social.</p>
          </div>

          <div className="info-card">
            <div className="info-card__icon">
              <ScrollText size={22} />
            </div>
            <h3>Estatuto Social</h3>
            <div className="info-card__highlight">Regularmente Registrado</div>
            <p>O IBRAS possui Estatuto Social regularmente registrado, que disciplina sua finalidade institucional, estrutura administrativa e regras de funcionamento.</p>
          </div>

          <div className="info-card">
            <div className="info-card__icon">
              <ShieldCheck size={22} />
            </div>
            <h3>Proteção de Dados</h3>
            <div className="info-card__highlight">Conformidade LGPD</div>
            <p>As informações disponibilizadas neste portal observam a legislação vigente, incluindo os princípios da Lei Geral de Proteção de Dados.</p>
          </div>

          <div className="info-card">
            <div className="info-card__icon">
              <Clock size={22} />
            </div>
            <h3>Atualização das Informações</h3>
            <div className="info-card__highlight">Dados Públicos</div>
            <p>Os dados institucionais desta página serão atualizados sempre que houver alterações relevantes na situação jurídica ou administrativa do IBRAS.</p>
          </div>
        </div>

        {/* LGPD Alert Box (Texto Original) */}
        <div className="transparency__lgpd-banner" role="alert">
          <div className="lgpd-banner__icon">
            <Info size={22} />
          </div>
          <div className="lgpd-banner__content">
            <div className="lgpd-banner__title-row">
              <span className="lgpd-pulse-dot" aria-hidden="true" />
              <strong>Importante:</strong>
              <span className="lgpd-badge-tag">Aviso Institucional · LGPD</span>
            </div>
            <p>
              O <strong>IBRAS</strong> disponibiliza neste portal as informações institucionais de interesse público.
              Documentos internos e dados que contenham informações pessoais ou protegidas pela legislação
              vigente não são divulgados, em observância à Lei Geral de Proteção de Dados e às demais normas aplicáveis.
            </p>
          </div>
        </div>

        {/* Prestação de Contas (Texto Original) */}
        <div className="transparency__accounting-box">
          <h3>Prestação de Contas</h3>
          <p>
            Atualmente, o IBRAS não executa projetos com recursos públicos ou convênios que exijam divulgação
            de prestações de contas. Caso venha a desenvolver iniciativas dessa natureza, as informações
            serão disponibilizadas nesta página.
          </p>
        </div>

        {/* Precisa de Mais Informações? (Seção Oficial do Site) */}
        <div className="transparency__more-info-card">
          <h3>Precisa de Mais Informações?</h3>
          <p>
            Caso tenha dúvidas sobre a atuação institucional do IBRAS ou deseje solicitar
            informações adicionais, entre em contato conosco.
          </p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => scrollToSection('contato')}
          >
            <span>Entrar em Contato</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  )
}
