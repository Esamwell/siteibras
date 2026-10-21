import { useState, useEffect } from 'react'
import {
  Newspaper,
  Calendar,
  User,
  ArrowRight,
  Search,
  ChevronRight,
  Sparkles,
  X
} from 'lucide-react'
import type { NewsItem } from '../types/news'
import { getStoredNews } from '../utils/newsStorage'
import './News.css'

const CATEGORIES = ['Todas', 'Institucional', 'Cidadania', 'Parcerias', 'Voluntariado', 'Eventos']
const HOME_LIMIT = 6 // max regular cards on homepage (+ 1 featured = 7 total)

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null)

  const reloadNews = () => setNews(getStoredNews())

  useEffect(() => {
    reloadNews()

    // Same-tab updates (admin panel modal)
    window.addEventListener('ibras_news_updated', reloadNews)

    // Cross-tab updates via BroadcastChannel (admin in /admin tab, site in / tab)
    let bc: BroadcastChannel | null = null
    try {
      bc = new BroadcastChannel('ibras_news_channel')
      bc.onmessage = (e) => {
        if (e.data?.type === 'news_updated') reloadNews()
      }
    } catch {
      // Fallback: listen to storage events for browsers without BroadcastChannel
      const handleStorage = (e: StorageEvent) => {
        if (e.key === 'ibras_news_data_v1' || e.key === 'ibras_news_ping') reloadNews()
      }
      window.addEventListener('storage', handleStorage)
      return () => {
        window.removeEventListener('ibras_news_updated', reloadNews)
        window.removeEventListener('storage', handleStorage)
      }
    }

    return () => {
      window.removeEventListener('ibras_news_updated', reloadNews)
      bc?.close()
    }
  }, [])

  const filteredNews = news.filter((item) => {
    const matchesCategory = selectedCategory === 'Todas' || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticle = news.find((item) => item.featured) || news[0]
  const regularArticles = filteredNews.filter(
    (item) => item.id !== featuredArticle?.id || searchQuery !== '' || selectedCategory !== 'Todas'
  )

  const isFiltering = Boolean(searchQuery) || selectedCategory !== 'Todas'
  const articlesToShow = isFiltering ? filteredNews : regularArticles
  const visibleArticles = articlesToShow.slice(0, HOME_LIMIT)
  const hasMore = articlesToShow.length > HOME_LIMIT || (!isFiltering && news.length > HOME_LIMIT + 1)

  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-')
      if (year && month && day) return `${day}/${month}/${year}`
      return dateStr
    } catch { return dateStr }
  }

  return (
    <section id="noticias" className="section news-section" aria-labelledby="news-title">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="badge badge--primary">
            <Newspaper size={14} className="badge-icon" /> Informativo &amp; Transparência
          </span>
          <h2 className="section-title" id="news-title">
            Notícias &amp; <span className="text-gradient">Acontecimentos</span>
          </h2>
          <p className="section-subtitle">
            Acompanhe as principais ações, avanços institucionais e projetos desenvolvidos pelo{' '}
            <strong>IBRAS</strong> em prol do fortalecimento comunitário e da cidadania.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="news__controls">
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

        {/* Featured Card */}
        {!searchQuery && selectedCategory === 'Todas' && featuredArticle && (
          <article className="news__featured-card">
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
              <h3 className="featured-card__title">{featuredArticle.title}</h3>
              <p className="featured-card__summary">{featuredArticle.summary}</p>
              <button type="button" className="btn btn--primary featured-card__btn" onClick={() => setActiveArticle(featuredArticle)}>
                <span>Ler Matéria Completa</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </article>
        )}

        {/* Grid — máx 6 cards na home */}
        <div className="news__grid">
          {filteredNews.length === 0 ? (
            <div className="news__empty-state">
              <Newspaper size={40} className="empty-icon" />
              <h4>Nenhuma notícia encontrada</h4>
              <p>Tente ajustar o termo da busca ou selecione outra categoria.</p>
              <button type="button" className="btn btn--outline" onClick={() => { setSelectedCategory('Todas'); setSearchQuery('') }}>
                Limpar Filtros
              </button>
            </div>
          ) : (
            visibleArticles.map((item) => (
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

        {/* "Ver Todas as Notícias" — sempre visível quando há notícias */}
        {news.length > 0 && (
          <div className="news__see-all">
            <a href="/noticias" className="btn btn--primary news__see-all-btn">
              <span>Ver Todas as Notícias</span>
              <ArrowRight size={16} />
            </a>
            <p className="news__see-all-hint">
              {hasMore
                ? `Mostrando 7 de ${news.length} notícias publicadas`
                : `${news.length} ${news.length === 1 ? 'notícia publicada' : 'notícias publicadas'} no total`}
            </p>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {activeArticle && (
        <div className="news-modal__backdrop" onClick={() => setActiveArticle(null)}>
          <div className="news-modal__card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="reader-title">
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
                <h2 id="reader-title" className="news-modal__title">{activeArticle.title}</h2>
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
                  Fechar
                </button>
                <a href="/noticias" className="btn btn--primary">
                  <span>Ver Todas as Notícias</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
