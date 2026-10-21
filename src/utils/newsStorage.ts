import type { NewsItem, AdminUser } from '../types/news'
import initialNewsData from '../data/noticias.json'
import { DEFAULT_ADMINS } from '../data/defaultUsers'

const NEWS_STORAGE_KEY = 'ibras_news_data_v1'
const USERS_STORAGE_KEY = 'ibras_admin_users_v1'
const AUTH_SESSION_KEY = 'ibras_auth_session_user'

/**
 * Get all news: reads from localStorage if edited, otherwise fallback to static JSON
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
 * Save updated news list to localStorage and trigger update events.
 * Fires both in this tab (custom event) AND in other open tabs (storage event).
 */
export function saveStoredNews(news: NewsItem[]) {
  localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news))
  // Notify same-tab listeners (News section on homepage)
  window.dispatchEvent(new Event('ibras_news_updated'))
  // Notify other tabs via BroadcastChannel (admin open in /admin, site in /)
  try {
    const bc = new BroadcastChannel('ibras_news_channel')
    bc.postMessage({ type: 'news_updated', timestamp: Date.now() })
    bc.close()
  } catch {
    // BroadcastChannel not supported — storage event fallback
    // Touch a separate key to trigger the storage event in other tabs
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
