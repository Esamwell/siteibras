import { useState, type FormEvent } from 'react'
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Building,
  HeartHandshake
} from 'lucide-react'
import './Contact.css'

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [submitError, setSubmitError] = useState('')

  // Envio automático para contato@ibrasinstituto.org via FormSubmit (sem necessidade de API key externa)
  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/contato@ibrasinstituto.org'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || 'Não informado',
          subject: formData.subject,
          message: formData.message,
          _subject: `[Contato Site IBRAS] ${formData.subject} - ${formData.name}`,
          _replyto: formData.email,
          _template: 'table',
          _captcha: 'false'
        })
      })

      if (res.ok) {
        setFormSubmitted(true)
      } else {
        const data = await res.json().catch(() => ({}))
        setSubmitError(
          data?.message ||
          'Não foi possível enviar a mensagem automaticamente. Envie diretamente para contato@ibrasinstituto.org'
        )
      }
    } catch {
      setSubmitError('Erro de conexão. Verifique sua conexão ou envie diretamente para contato@ibrasinstituto.org')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    setFormSubmitted(false)
    setSubmitError('')
  }


  return (
    <section className="section contact-section" id="contato">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="badge badge--primary">
            <MessageSquare size={14} className="badge-icon" /> Fale Conosco
          </span>
          <h2 className="section-title">
            Envie sua <span className="text-gradient">Mensagem</span>
          </h2>
          <p className="section-subtitle">
            Estamos à disposição para esclarecer dúvidas, receber sugestões, avaliar propostas
            de parceria e dialogar sobre iniciativas que promovam cidadania, inclusão social
            e transformação de realidades.
          </p>
        </div>

        <div className="contact__layout">
          {/* Left Column: Authentic Institutional Info */}
          <div className="contact__info">
            <div className="contact__card-primary">
              <span className="contact__pill">
                <ShieldCheck size={14} /> Atendimento Prioritariamente Digital
              </span>
              <h3>Diretrizes de Atendimento</h3>
              <p>
                O IBRAS realiza seu atendimento prioritariamente por meios digitais. Todas as
                mensagens são encaminhadas diretamente à equipe responsável e respondidas o mais breve possível.
              </p>

              <div className="contact__channels">
                <a
                  href="mailto:contato@ibrasinstituto.org"
                  className="channel-item"
                  title="Enviar e-mail para o IBRAS"
                >
                  <div className="channel-item__icon">
                    <Mail size={20} />
                  </div>
                  <div className="channel-item__content">
                    <span className="channel-item__label">E-mail Oficial</span>
                    <strong className="channel-item__value">contato@ibrasinstituto.org</strong>
                  </div>
                </a>

                <div className="channel-item channel-item--static">
                  <div className="channel-item__icon">
                    <Building size={20} />
                  </div>
                  <div className="channel-item__content">
                    <span className="channel-item__label">Cadastro Nacional (CNPJ)</span>
                    <strong className="channel-item__value">30.285.883/0001-94</strong>
                  </div>
                </div>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Rua+dos+R%C3%A1dioamadores,+73+-+Pitua%C3%A7u,+Salvador+-+BA,+41741-080"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-item"
                  title="Abrir localização no Google Maps"
                >
                  <div className="channel-item__icon">
                    <MapPin size={20} />
                  </div>
                  <div className="channel-item__content">
                    <span className="channel-item__label">Endereço da Sede (Abrir Mapa)</span>
                    <strong className="channel-item__value">
                      Rua dos Rádioamadores, 73 - Pituaçu, Salvador - BA, CEP 41741-080
                    </strong>
                  </div>
                </a>

                <div className="channel-item channel-item--static">
                  <div className="channel-item__icon">
                    <Clock size={20} />
                  </div>
                  <div className="channel-item__content">
                    <span className="channel-item__label">Reuniões Presenciais</span>
                    <strong className="channel-item__value">
                      Exclusivamente mediante agendamento prévio
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Box from Original Site */}
            <div className="contact__dialogue-box">
              <div className="dialogue-box__icon">
                <HeartHandshake size={28} />
              </div>
              <div className="dialogue-box__text">
                <strong>Vamos construir juntos uma sociedade melhor</strong>
                <p>
                  O IBRAS acredita na força do diálogo, da cooperação e da participação social.
                  Se você representa uma instituição, empresa ou organização, será um prazer conversar com você.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="contact__form-wrapper">
            {formSubmitted ? (
              <div className="contact__success">
                <div className="success__icon">
                  <CheckCircle size={56} />
                </div>
                <h3>Mensagem Enviada com Sucesso!</h3>
                <p>
                  Agradecemos seu contato, <strong>{formData.name || 'amigo(a)'}</strong>. Nossa equipe
                  recebeu sua mensagem e responderá através do e-mail informado o mais breve possível.
                </p>
                <button className="btn btn--primary" onClick={handleReset}>
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                <div className="form-header">
                  <h3>Formulário de Contato</h3>
                  <p>Preencha os campos abaixo para falar diretamente com a equipe do IBRAS.</p>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-name">Nome *</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">E-mail *</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="seuemail@exemplo.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact-phone">Telefone / WhatsApp (opcional)</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="(71) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-subject">Assunto *</label>
                    <input
                      id="contact-subject"
                      type="text"
                      required
                      placeholder="Ex: Proposta de Parceria, Informação, Dúvida"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-message">Mensagem *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Escreva sua mensagem com detalhes..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="form-privacy">
                  <small>
                    🔒 As informações enviadas serão tratadas com confidencialidade e utilizadas
                    exclusivamente para responder à sua solicitação, em conformidade com a LGPD.
                  </small>
                </div>

                <button
                  type="submit"
                  className="btn btn--primary btn--full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Enviando mensagem...</span>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <Send size={18} />
                    </>
                  )}
                </button>

                {submitError && (
                  <div className="contact__error">
                    ⚠️ {submitError}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
