import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Newspaper,
  Calendar,
  User,
  ArrowLeft,
  Search,
  ChevronRight,
  Sparkles,
  X,
  ArrowRight,
  ChevronLeft,
  Filter
} from 'lucide-react'
import type { NewsItem } from '../types/news'
import {
  getStoredNews,
  fetchRemoteNews,
  subscribeToNewsChanges
} from '../utils/newsStorage'
import '../components/News.css'
import './NoticiasPage.css'

const CATEGORIES = ['Todas', 'Institucional', 'Cidadania', 'Parcerias', 'Voluntariado', 'Eventos']
const PAGE_SIZE = 9

export default function NoticiasPage() {
  const navigate = useNavigate()
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null)
  const [page, setPage] = useState(1)

  useEffect(() => {
    document.title = 'Notícias & Acontecimentos — IBRAS'
    const reload = () => setNews(getStoredNews())
    reload()

    fetchRemoteNews().then((data) => {
      if (data && data.length > 0) setNews(data)
    })

    const unsubscribe = subscribeToNewsChanges(() => {
      reload()
    })

    // Same-tab updates
    window.addEventListener('ibras_news_updated', reload)

    // Cross-tab: BroadcastChannel (admin posts from /admin, this page refreshes instantly)
    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel('ibras_news_channel')
      bc.onmessage = (e) => { if (e.data?.type === 'news_updated') reload() }
    } catch {
      const handleStorage = (e: StorageEvent) => {
        if (e.key === 'ibras_news_data_v1' || e.key === 'ibras_news_ping') reload()
      }
      window.addEventListener('storage', handleStorage)
      return () => {
        unsubscribe()
        window.removeEventListener('ibras_news_updated', reload)
        window.removeEventListener('storage', handleStorage)
      }
    }

    return () => {
      unsubscribe()
      window.removeEventListener('ibras_news_updated', reload)
      bc?.close()
    }
  }, [])

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [selectedCategory, searchQuery])

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticle = news.find((item) => item.featured) || news[0]
  const isFiltering = Boolean(searchQuery) || selectedCategory !== 'Todas'

  // All articles minus featured (when not filtering)
  const articlesPool = isFiltering
    ? filteredNews
    : filteredNews.filter((item) => item.id !== featuredArticle?.id)

  const totalPages = Math.ceil(articlesPool.length / PAGE_SIZE)
  const pagedArticles = articlesPool.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-')
      if (year && month && day) return `${day}/${month}/${year}`
      return dateStr
    } catch { return dateStr }
  }

  return (
    <div className="noticias-page">
      {/* Top bar */}
      <header className="noticias-page__topbar">
        <div className="container noticias-page__topbar-inner">
          <button type="button" className="noticias-page__back" onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            <span>Voltar ao Site</span>
          </button>
          <div className="noticias-page__brand">
            <img src="/logo-ibras.png" alt="IBRAS" className="noticias-page__logo" />
            <span>IBRAS — Notícias &amp; Acontecimentos</span>
          </div>
        </div>
      </header>

      {/* Hero banner */}
      <div className="noticias-page__hero">
        <div className="container">
          <span className="badge badge--primary">
            <Newspaper size={14} className="badge-icon" /> Informativo &amp; Transparência
          </span>
          <h1 className="noticias-page__title">
            Notícias &amp; <span className="text-gradient">Acontecimentos</span>
          </h1>
          <p className="noticias-page__subtitle">
            Acompanhe todas as ações, avanços institucionais e projetos desenvolvidos pelo{' '}
            <strong>IBRAS</strong> em prol do fortalecimento comunitário e da cidadania.
            <br />
            <em>{news.length} {news.length === 1 ? 'notícia publicada' : 'notícias publicadas'}</em>
          </p>
        </div>
      </div>

      <div className="container noticias-page__body">
        {/* Filter + Search */}
        <div className="news__controls noticias-page__controls">
          <div className="noticias-controls__left">
            <Filter size={15} className="filter-icon" />
            <div className="news__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`news__cat-pill ${selectedCategory === cat ? 'news__cat-pill--active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="news__search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar notícias..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Buscar notícias"
            />
            {searchQuery && (
              <button type="button" className="search-clear-btn" onClick={() => setSearchQuery('')} aria-label="Limpar busca">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Featured — only on "Todas" without search */}
        {!isFiltering && featuredArticle && (
          <article className="news__featured-card noticias-page__featured">
            <div className="featured-card__media">
              <img src={featuredArticle.imageUrl || '/equipe/diretoria-lideranca.jpg'} alt={featuredArticle.title} className="featured-card__img" />
              <span className="featured-card__badge"><Sparkles size={13} /> Destaque Principal</span>
            </div>
            <div className="featured-card__body">
              <div className="featured-card__meta">
                <span className="news-tag">{featuredArticle.category}</span>
                <span className="news-meta-item"><Calendar size={13} /> {formatDate(featuredArticle.publishedAt)}</span>
                <span className="news-meta-item"><User size={13} /> {featuredArticle.author}</span>
              </div>
              <h2 className="featured-card__title">{featuredArticle.title}</h2>
              <p className="featured-card__summary">{featuredArticle.summary}</p>
              <button type="button" className="btn btn--primary featured-card__btn" onClick={() => setActiveArticle(featuredArticle)}>
                <span>Ler Matéria Completa</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </article>
        )}

        {/* Results info */}
        {isFiltering && (
          <div className="noticias-page__results-info">
            <span>
              {filteredNews.length === 0
                ? 'Nenhum resultado encontrado'
                : `${filteredNews.length} ${filteredNews.length === 1 ? 'resultado' : 'resultados'} encontrados`}
            </span>
            <button type="button" className="noticias-page__clear-filters" onClick={() => { setSelectedCategory('Todas'); setSearchQuery('') }}>
              <X size={13} /> Limpar filtros
            </button>
          </div>
        )}

        {/* Grid */}
        <div className="news__grid noticias-page__grid">
          {pagedArticles.length === 0 ? (
            <div className="news__empty-state">
              <Newspaper size={40} className="empty-icon" />
              <h4>Nenhuma notícia encontrada</h4>
              <p>Tente ajustar o termo da busca ou selecione outra categoria.</p>
              <button type="button" className="btn btn--outline" onClick={() => { setSelectedCategory('Todas'); setSearchQuery('') }}>
                Ver Todas as Notícias
              </button>
            </div>
          ) : (
            pagedArticles.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-card__media">
                  <img src={item.imageUrl || '/equipe/equipe-geral.jpg'} alt={item.title} className="news-card__img" loading="lazy" />
                  <span className="news-tag news-tag--floating">{item.category}</span>
                </div>
                <div className="news-card__body">
                  <div className="news-card__meta">
                    <span className="news-meta-item"><Calendar size={12} /> {formatDate(item.publishedAt)}</span>
                    <span className="news-meta-item"><User size={12} /> {item.author}</span>
                  </div>
                  <h3 className="news-card__title">{item.title}</h3>
                  <p className="news-card__summary">{item.summary}</p>
                  <div className="news-card__footer">
                    <button type="button" className="news-card__read-more" onClick={() => setActiveArticle(item)}>
                      <span>Ler notícia</span>
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="noticias-page__pagination" aria-label="Paginação das notícias">
            <button
              type="button"
              className="pagination-btn"
              onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              disabled={page === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                className={`pagination-btn pagination-btn--num ${page === p ? 'pagination-btn--active' : ''}`}
                onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                aria-label={`Ir para página ${p}`}
                aria-current={page === p ? 'page' : undefined}
              >
                {p}
              </button>
            ))}

            <button
              type="button"
              className="pagination-btn"
              onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              disabled={page === totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="news-modal__backdrop" onClick={() => setActiveArticle(null)}>
          <div className="news-modal__card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="noticias-reader-title">
            <button type="button" className="news-modal__close" onClick={() => setActiveArticle(null)} aria-label="Fechar notícia">
              <X size={20} />
            </button>
            <div className="news-modal__content">
              <div className="news-modal__header">
                <div className="news-modal__meta">
                  <span className="news-tag">{activeArticle.category}</span>
                  <span className="news-meta-item"><Calendar size={13} /> {formatDate(activeArticle.publishedAt)}</span>
                  <span className="news-meta-item"><User size={13} /> {activeArticle.author}</span>
                </div>
                <h2 id="noticias-reader-title" className="news-modal__title">{activeArticle.title}</h2>
              </div>
              {activeArticle.imageUrl && (
                <div className="news-modal__img-wrap">
                  <img src={activeArticle.imageUrl} alt={activeArticle.title} className="news-modal__img" />
                </div>
              )}
              <div className="news-modal__body">
                <p className="news-modal__lead">{activeArticle.summary}</p>
                <div
                  className="news-modal__text news-modal__rich-content"
                  dangerouslySetInnerHTML={{
                    __html: activeArticle.content.startsWith('<')
                      ? activeArticle.content
                      : activeArticle.content.split('\n\n').map((p) => `<p>${p}</p>`).join('')
                  }}
                />
              </div>
              <div className="news-modal__footer">
                <button type="button" className="btn btn--outline" onClick={() => setActiveArticle(null)}>
                  Voltar às Notícias
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
