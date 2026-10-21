export interface NewsItem {
  id: string
  title: string
  slug: string
  summary: string
  content: string
  category: 'Institucional' | 'Cidadania' | 'Parcerias' | 'Voluntariado' | 'Eventos'
  imageUrl: string
  publishedAt: string
  author: string
  featured?: boolean
}

export interface AdminUser {
  id: string
  username: string
  name: string
  role: 'admin' | 'editor'
  passwordHash: string // SHA-256 hex string
  createdAt: string
}
