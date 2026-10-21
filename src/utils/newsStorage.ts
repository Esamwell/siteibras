import type { NewsItem, AdminUser } from '../types/news'
import initialNewsData from '../data/noticias.json'
import { DEFAULT_ADMINS } from '../data/defaultUsers'
import { supabase } from './supabase'

const NEWS_STORAGE_KEY = 'ibras_news_data_v1'
const USERS_STORAGE_KEY = 'ibras_admin_users_v1'
const AUTH_SESSION_KEY = 'ibras_auth_session_user'

/**
 * Get all news: reads from localStorage cache if present, otherwise initial JSON.
 */
export function getStoredNews(): NewsItem[] {
  try {
    const raw = localStorage.getItem(NEWS_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Erro ao ler notícias locais:', err)
  }
  return initialNewsData as NewsItem[]
}

/**
 * Fetch latest news directly from Supabase and sync local cache.
 */
export async function fetchRemoteNews(): Promise<NewsItem[]> {
  try {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })

    if (error) {
      console.warn('Aviso Supabase (usando cache local):', error.message)
      return getStoredNews()
    }

    if (data && data.length > 0) {
      const mapped: NewsItem[] = data.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug || row.id,
        category: row.category,
        summary: row.summary,
        content: row.content,
        imageUrl: row.image_url || '/equipe/equipe-geral.jpg',
        publishedAt: row.published_at,
        author: row.author,
        featured: Boolean(row.featured),
      }))

      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(mapped))
      window.dispatchEvent(new Event('ibras_news_updated'))
      return mapped
    }
  } catch (err) {
    console.warn('Erro ao conectar ao Supabase:', err)
  }
  return getStoredNews()
}

/**
 * Save / Update a single news item in Supabase
 */
export async function saveNewsToSupabase(item: NewsItem): Promise<boolean> {
  try {
    // If this item is marked as featured, un-feature any other articles
    if (item.featured) {
      await supabase
        .from('news')
        .update({ featured: false })
        .neq('id', item.id)
    }

    const { error } = await supabase.from('news').upsert({
      id: item.id,
      title: item.title,
      slug: item.slug || item.id,
      category: item.category,
      summary: item.summary,
      content: item.content,
      image_url: item.imageUrl || null,
      published_at: item.publishedAt,
      author: item.author,
      featured: Boolean(item.featured),
    })

    if (error) {
      console.error('Erro ao salvar no Supabase:', error)
      return false
    }

    // Refresh remote cache after write
    await fetchRemoteNews()
    return true
  } catch (err) {
    console.error('Erro ao salvar no Supabase:', err)
    return false
  }
}

/**
 * Delete a news item from Supabase
 */
export async function deleteNewsFromSupabase(id: string): Promise<boolean> {
  try {
    const { error } = await supabase.from('news').delete().eq('id', id)
    if (error) {
      console.error('Erro ao excluir do Supabase:', error)
      return false
    }
    await fetchRemoteNews()
    return true
  } catch (err) {
    console.error('Erro ao excluir do Supabase:', err)
    return false
  }
}

/**
 * Subscribe to Supabase real-time changes
 */
export function subscribeToNewsChanges(callback: () => void) {
  try {
    const channel = supabase
      .channel('public:news')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'news' },
        async () => {
          await fetchRemoteNews()
          callback()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  } catch {
    return () => {}
  }
}

/**
 * Save updated news list to localStorage and trigger update events.
 */
export function saveStoredNews(news: NewsItem[]) {
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news))
  window.dispatchEvent(new Event('ibras_news_updated'))
  try {
    const bc = new BroadcastChannel('ibras_news_channel')
    bc.postMessage({ type: 'news_updated', timestamp: Date.now() })
    bc.close()
  } catch {
    localStorage.setItem('ibras_news_ping', Date.now().toString())
  }
}

/**
 * Export current news array as a downloadable formatted noticias.json
 */
export function exportNewsAsJson(news: NewsItem[]) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(news, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', dataStr)
  downloadAnchor.setAttribute('download', 'noticias.json')
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}

/**
 * Get all admin users
 */
export function getStoredUsers(): AdminUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
      }
    }
  } catch (err) {
    console.warn('Erro ao ler usuários locais:', err)
  }
  return DEFAULT_ADMINS
}

/**
 * Save updated admin users
 */
export function saveStoredUsers(users: AdminUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

/**
 * Export current users as defaultUsers.json backup
 */
export function exportUsersAsJson(users: AdminUser[]) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(users, null, 2))
  const downloadAnchor = document.createElement('a')
  downloadAnchor.setAttribute('href', dataStr)
  downloadAnchor.setAttribute('download', 'usuarios-admin.json')
  document.body.appendChild(downloadAnchor)
  downloadAnchor.click()
  downloadAnchor.remove()
}

/**
 * Current Session helpers
 */
export function getActiveSessionUser(): AdminUser | null {
  try {
    const raw = sessionStorage.getItem(AUTH_SESSION_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    return null
  }
  return null
}

export function setActiveSessionUser(user: AdminUser | null) {
  if (user) {
    sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(user))
  } else {
    sessionStorage.removeItem(AUTH_SESSION_KEY)
  }
  window.dispatchEvent(new Event('ibras_auth_changed'))
}
