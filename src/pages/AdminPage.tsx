import { useEffect, useState, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Lock,
  User,
  KeyRound,
  UserPlus,
  FileDown,
  Trash2,
  Edit3,
  PlusCircle,
  LogOut,
  X,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Eye,
  EyeOff,
  Users,
  ArrowLeft,
  Newspaper
} from 'lucide-react'
import { useRef } from 'react'
import type { NewsItem, AdminUser } from '../types/news'
import {
  getStoredNews,
  saveStoredNews,
  exportNewsAsJson,
  getStoredUsers,
  saveStoredUsers,
  getActiveSessionUser,
  setActiveSessionUser,
  fetchRemoteNews,
  saveNewsToSupabase,
  deleteNewsFromSupabase
} from '../utils/newsStorage'
import { sha256 } from '../utils/crypto'
import RichTextEditor from '../components/RichTextEditor'
import '../components/AdminNewsModal.css'
import './AdminPage.css'

type TabType = 'news' | 'users' | 'profile'

export default function AdminPage() {
  const navigate = useNavigate()

  // Auth state
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(getActiveSessionUser())
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [showLoginPassword, setShowLoginPassword] = useState(false)

  // Navigation tab
  const [activeTab, setActiveTab] = useState<TabType>('news')

  // News list state
  const [newsList, setNewsList] = useState<NewsItem[]>([])
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [isCreatingNews, setIsCreatingNews] = useState(false)

  // Form News state
  const [formTitle, setFormTitle] = useState('')
  const [formCategory, setFormCategory] = useState<NewsItem['category']>('Institucional')
  const [formSummary, setFormSummary] = useState('')
  const [formContent, setFormContent] = useState('')
  const [formImageUrl, setFormImageUrl] = useState('')
  const [formImagePreview, setFormImagePreview] = useState('')
  const [formAuthor, setFormAuthor] = useState('')
  const [formFeatured, setFormFeatured] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Users management state
  const [usersList, setUsersList] = useState<AdminUser[]>([])
  const [newUserName, setNewUserName] = useState('')
  const [newUserUsername, setNewUserUsername] = useState('')
  const [newUserPassword, setNewUserPassword] = useState('')
  const [newUserRole, setNewUserRole] = useState<'admin' | 'editor'>('editor')

  // Change password state
  const [currentPasswordInput, setCurrentPasswordInput] = useState('')
  const [newPasswordInput, setNewPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

  // Notifications
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text })
    setTimeout(() => setFeedbackMsg(null), 3500)
  }

  const refreshData = () => {
    setNewsList(getStoredNews())
    setUsersList(getStoredUsers())
    fetchRemoteNews().then((data) => {
      if (data && data.length > 0) setNewsList(data)
    })
  }

  useEffect(() => {
    document.title = 'Painel Administrativo — IBRAS'
    refreshData()
  }, [])

  // ── Auth ──────────────────────────────────────────────────
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setLoginError('')
    const users = getStoredUsers()
    const foundUser = users.find(
      (u) => u.username.toLowerCase() === loginUsername.trim().toLowerCase()
    )
    if (!foundUser) { setLoginError('Usuário não encontrado.'); return }
    const inputHash = await sha256(loginPassword)
    if (inputHash !== foundUser.passwordHash) { setLoginError('Senha incorreta.'); return }
    setActiveSessionUser(foundUser)
    setCurrentUser(foundUser)
    setLoginUsername('')
    setLoginPassword('')
    refreshData()
    showFeedback('success', `Bem-vindo(a), ${foundUser.name}!`)
  }

  const handleLogout = () => {
    setActiveSessionUser(null)
    setCurrentUser(null)
    setEditingNews(null)
    setIsCreatingNews(false)
  }

  // ── News form ─────────────────────────────────────────────
  const openNewForm = () => {
    setEditingNews(null)
    setFormTitle('')
    setFormCategory('Institucional')
    setFormSummary('')
    setFormContent('')
    setFormImageUrl('')
    setFormImagePreview('')
    setFormAuthor(currentUser?.name || 'Comunicação IBRAS')
    setFormFeatured(false)
    setIsCreatingNews(true)
  }

  const openEditForm = (item: NewsItem) => {
    setEditingNews(item)
    setFormTitle(item.title)
    setFormCategory(item.category)
    setFormSummary(item.summary)
    setFormContent(item.content)
    setFormImageUrl(item.imageUrl)
    setFormImagePreview(item.imageUrl || '')
    setFormAuthor(item.author)
    setFormFeatured(Boolean(item.featured))
    setIsCreatingNews(true)
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) { showFeedback('error', 'Selecione um arquivo de imagem válido.'); return }
    if (file.size > 5 * 1024 * 1024) { showFeedback('error', 'A imagem deve ter no máximo 5 MB.'); return }
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string
      setFormImageUrl(dataUrl)
      setFormImagePreview(dataUrl)
    }
    reader.readAsDataURL(file)
  }

  const handleSaveNews = (e: FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim() || !formSummary.trim() || !formContent.trim()) {
      showFeedback('error', 'Preencha todos os campos obrigatórios.')
      return
    }
    const currentList = getStoredNews()
    const today = new Date().toISOString().split('T')[0]
    if (editingNews) {
      let updatedItem: NewsItem | null = null
      const updatedList = currentList.map((item) => {
        if (item.id === editingNews.id) {
          updatedItem = {
            ...item,
            title: formTitle.trim(),
            category: formCategory,
            summary: formSummary.trim(),
            content: formContent.trim(),
            imageUrl: formImageUrl || '/equipe/equipe-geral.jpg',
            author: formAuthor.trim() || 'Comunicação IBRAS',
            featured: formFeatured
          }
          return updatedItem
        }
        return formFeatured ? { ...item, featured: false } : item
      })
      saveStoredNews(updatedList)
      setNewsList(updatedList)
      if (updatedItem) {
        saveNewsToSupabase(updatedItem)
      }
      showFeedback('success', 'Notícia atualizada e sincronizada na nuvem!')
    } else {
      const newItem: NewsItem = {
        id: `noticia-${Date.now()}`,
        title: formTitle.trim(),
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: formCategory,
        summary: formSummary.trim(),
        content: formContent.trim(),
        imageUrl: formImageUrl || '/equipe/equipe-geral.jpg',
        publishedAt: today,
        author: formAuthor.trim() || currentUser?.name || 'Comunicação IBRAS',
        featured: formFeatured
      }
      let updatedList = [newItem, ...currentList]
      if (formFeatured) updatedList = updatedList.map((item) => item.id === newItem.id ? item : { ...item, featured: false })
      saveStoredNews(updatedList)
      setNewsList(updatedList)
      saveNewsToSupabase(newItem)
      showFeedback('success', 'Notícia publicada com sucesso na nuvem!')
    }
    setIsCreatingNews(false)
    setEditingNews(null)
  }

  const handleDeleteNews = (id: string) => {
    if (confirm('Tem certeza de que deseja excluir esta notícia?')) {
      const updatedList = getStoredNews().filter((item) => item.id !== id)
      saveStoredNews(updatedList)
      setNewsList(updatedList)
      deleteNewsFromSupabase(id)
      showFeedback('success', 'Notícia removida da nuvem.')
    }
  }

  // ── Users ─────────────────────────────────────────────────
  const handleCreateUser = async (e: FormEvent) => {
    e.preventDefault()
    if (!newUserName.trim() || !newUserUsername.trim() || !newUserPassword.trim()) { showFeedback('error', 'Preencha todos os campos.'); return }
    const users = getStoredUsers()
    if (users.some((u) => u.username.toLowerCase() === newUserUsername.trim().toLowerCase())) { showFeedback('error', 'Usuário já existe.'); return }
    const passwordHash = await sha256(newUserPassword)
    const newUser: AdminUser = { id: `user-${Date.now()}`, name: newUserName.trim(), username: newUserUsername.trim().toLowerCase(), role: newUserRole, passwordHash, createdAt: new Date().toISOString().split('T')[0] }
    const updatedUsers = [...users, newUser]
    saveStoredUsers(updatedUsers)
    setUsersList(updatedUsers)
    setNewUserName(''); setNewUserUsername(''); setNewUserPassword('')
    showFeedback('success', `Usuário "${newUser.username}" criado!`)
  }

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser?.id) { showFeedback('error', 'Você não pode excluir sua própria conta.'); return }
    if (confirm('Confirma a exclusão deste usuário?')) {
      const updated = getStoredUsers().filter((u) => u.id !== userId)
      saveStoredUsers(updated)
      setUsersList(updated)
      showFeedback('success', 'Usuário removido.')
    }
  }

  // ── Password ──────────────────────────────────────────────
  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!currentUser) return
    if (!currentPasswordInput || !newPasswordInput || !confirmPasswordInput) { showFeedback('error', 'Preencha todas as senhas.'); return }
    if (newPasswordInput !== confirmPasswordInput) { showFeedback('error', 'As senhas não coincidem.'); return }
    if (newPasswordInput.length < 6) { showFeedback('error', 'A nova senha deve ter no mínimo 6 caracteres.'); return }
    const currentHash = await sha256(currentPasswordInput)
    if (currentHash !== currentUser.passwordHash) { showFeedback('error', 'Senha atual incorreta.'); return }
    const newHash = await sha256(newPasswordInput)
    const updatedUsers = getStoredUsers().map((u) => u.id === currentUser.id ? { ...u, passwordHash: newHash } : u)
    saveStoredUsers(updatedUsers)
    const updatedSelf = { ...currentUser, passwordHash: newHash }
    setActiveSessionUser(updatedSelf)
    setCurrentUser(updatedSelf)
    setCurrentPasswordInput(''); setNewPasswordInput(''); setConfirmPasswordInput('')
    showFeedback('success', 'Senha alterada com sucesso!')
  }

  return (
    <div className="admin-page">
      {/* Top bar */}
      <header className="admin-page__topbar">
        <div className="admin-page__brand">
          <img src="/logo-ibras.png" alt="IBRAS" className="admin-page__logo" />
          <div>
            <span className="admin-page__title">Painel Administrativo</span>
            <span className="admin-page__subtitle">IBRAS — Instituto Brasileiro de Atenção Social</span>
          </div>
        </div>
        <div className="admin-page__topbar-right">
          {currentUser && (
            <span className="admin-page__user-pill">
              <User size={14} /> {currentUser.name}
            </span>
          )}
          <button
            type="button"
            className="admin-page__back-btn"
            onClick={() => navigate('/')}
            title="Voltar ao site"
          >
            <ArrowLeft size={15} />
            <span>Voltar ao Site</span>
          </button>
        </div>
      </header>

      <div className="admin-page__body">
        {/* Feedback */}
        {feedbackMsg && (
          <div className={`admin-feedback admin-feedback--${feedbackMsg.type} admin-page__feedback`}>
            {feedbackMsg.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* LOGIN */}
        {!currentUser ? (
          <div className="admin-page__login-wrap">
            <div className="admin-login-box admin-page__login-box">
              <div className="login-box__icon"><Lock size={36} /></div>
              <h2>Acesso Restrito</h2>
              <p>Informe suas credenciais para acessar o painel de gerenciamento.</p>
              {loginError && (
                <div className="admin-feedback admin-feedback--error">
                  <AlertCircle size={15} /><span>{loginError}</span>
                </div>
              )}
              <form onSubmit={handleLogin} className="admin-login-form">
                <div className="admin-form-group">
                  <label htmlFor="page-login-user">Usuário</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input id="page-login-user" type="text" placeholder="Ex: admin" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} required />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label htmlFor="page-login-pass">Senha</label>
                  <div className="input-with-icon">
                    <KeyRound size={16} className="input-icon" />
                    <input id="page-login-pass" type={showLoginPassword ? 'text' : 'password'} placeholder="Sua senha..." value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                    <button type="button" className="password-toggle-btn" onClick={() => setShowLoginPassword(!showLoginPassword)} aria-label="Ver senha">
                      {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn--primary login-submit-btn">Entrar no Painel</button>
              </form>
              <div className="admin-login-tip">🔐 Padrão: usuário <strong>admin</strong>, senha <strong>ibras2026</strong></div>
            </div>
          </div>
        ) : (
          /* DASHBOARD */
          <div className="admin-page__dashboard">
            {/* Sidebar */}
            <aside className="admin-page__sidebar">
              <nav className="admin-page__sidenav">
                <button className={`admin-page__navitem ${activeTab === 'news' ? 'active' : ''}`} onClick={() => { setActiveTab('news'); setIsCreatingNews(false) }}>
                  <Newspaper size={18} />
                  <span>Notícias <em>({newsList.length})</em></span>
                </button>
                {currentUser.role === 'admin' && (
                  <button className={`admin-page__navitem ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
                    <Users size={18} />
                    <span>Usuários <em>({usersList.length})</em></span>
                  </button>
                )}
                <button className={`admin-page__navitem ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
                  <KeyRound size={18} />
                  <span>Minha Senha</span>
                </button>
              </nav>
              <div className="admin-page__sidebar-footer">
                <button className="admin-logout-btn admin-page__logout" onClick={handleLogout}>
                  <LogOut size={14} /><span>Sair da Sessão</span>
                </button>
              </div>
            </aside>

            {/* Main content */}
            <main className="admin-page__main">
              {/* TAB: NOTÍCIAS */}
              {activeTab === 'news' && (
                <div className="admin-tab-content">
                  {!isCreatingNews ? (
                    <>
                      <div className="admin-actions-bar">
                        <button type="button" className="btn btn--primary" onClick={openNewForm}>
                          <PlusCircle size={16} /><span>Publicar Nova Notícia</span>
                        </button>
                        <div className="admin-actions-right">
                          <button type="button" className="btn btn--outline" onClick={() => exportNewsAsJson(newsList)}>
                            <FileDown size={16} /><span>Baixar noticias.json</span>
                          </button>
                        </div>
                      </div>
                      <div className="admin-table-wrap">
                        <table className="admin-table">
                          <thead><tr><th>Data</th><th>Título</th><th>Categoria</th><th>Autor</th><th>Status</th><th>Ações</th></tr></thead>
                          <tbody>
                            {newsList.map((item) => (
                              <tr key={item.id}>
                                <td>{item.publishedAt}</td>
                                <td className="table-title-cell"><strong>{item.title}</strong></td>
                                <td><span className="news-tag">{item.category}</span></td>
                                <td>{item.author}</td>
                                <td>{item.featured ? <span className="badge-featured">⭐ Destaque</span> : <span className="badge-normal">Padrão</span>}</td>
                                <td>
                                  <div className="table-actions">
                                    <button type="button" className="action-icon-btn action-icon-btn--edit" onClick={() => openEditForm(item)} title="Editar"><Edit3 size={15} /></button>
                                    <button type="button" className="action-icon-btn action-icon-btn--delete" onClick={() => handleDeleteNews(item.id)} title="Excluir"><Trash2 size={15} /></button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="admin-form-panel">
                      <div className="form-panel__header">
                        <h3>{editingNews ? 'Editar Notícia' : 'Publicar Nova Notícia'}</h3>
                        <button type="button" className="btn btn--outline" onClick={() => setIsCreatingNews(false)}>Cancelar</button>
                      </div>
                      <form onSubmit={handleSaveNews} className="news-edit-form">
                        <div className="admin-form-group">
                          <label>Título da Notícia *</label>
                          <input type="text" required placeholder="Ex: IBRAS promove nova ação cidadã..." value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
                        </div>
                        <div className="admin-form-row">
                          <div className="admin-form-group">
                            <label>Categoria *</label>
                            <select value={formCategory} onChange={(e) => setFormCategory(e.target.value as any)}>
                              <option value="Institucional">Institucional</option>
                              <option value="Cidadania">Cidadania</option>
                              <option value="Parcerias">Parcerias</option>
                              <option value="Voluntariado">Voluntariado</option>
                              <option value="Eventos">Eventos</option>
                            </select>
                          </div>
                          <div className="admin-form-group">
                            <label>Autor / Responsável</label>
                            <input type="text" placeholder="Ex: Comunicação IBRAS" value={formAuthor} onChange={(e) => setFormAuthor(e.target.value)} />
                          </div>
                          <div className="admin-form-group">
                            <label>Foto da Matéria</label>
                            <div className="image-upload-zone" onClick={() => fileInputRef.current?.click()}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => { e.preventDefault(); const file = e.dataTransfer.files?.[0]; if (file) { const fakeEvent = { target: { files: [file] } } as unknown as ChangeEvent<HTMLInputElement>; handleImageUpload(fakeEvent) } }}>
                              {formImagePreview ? (
                                <div className="image-upload-preview">
                                  <img src={formImagePreview} alt="Prévia" className="image-preview-thumb" />
                                  <button type="button" className="image-remove-btn" onClick={(e) => { e.stopPropagation(); setFormImageUrl(''); setFormImagePreview(''); if (fileInputRef.current) fileInputRef.current.value = '' }}><X size={14} /> Remover</button>
                                </div>
                              ) : (
                                <div className="image-upload-placeholder">
                                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                                  <span>Clique ou arraste aqui</span>
                                  <small>JPG, PNG, WEBP — máx. 5 MB</small>
                                </div>
                              )}
                            </div>
                            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageUpload} />
                          </div>
                        </div>
                        <div className="admin-form-group">
                          <label>Resumo Chamada (Subtítulo curto) *</label>
                          <textarea rows={2} required placeholder="Breve resumo que aparece nos cartões..." value={formSummary} onChange={(e) => setFormSummary(e.target.value)} />
                        </div>
                        <div className="admin-form-group">
                          <label>Conteúdo Completo da Matéria *</label>
                          <RichTextEditor value={formContent} onChange={setFormContent} placeholder="Texto completo da matéria. Use a barra acima para formatar títulos, negrito, listas..." minHeight={280} />
                        </div>
                        <div className="admin-form-checkbox">
                          <label>
                            <input type="checkbox" checked={formFeatured} onChange={(e) => setFormFeatured(e.target.checked)} />
                            <span>Definir como <strong>Destaque Principal</strong> no topo das notícias</span>
                          </label>
                        </div>
                        <div className="form-submit-row">
                          <button type="submit" className="btn btn--primary"><span>{editingNews ? 'Salvar Alterações' : 'Publicar Notícia'}</span></button>
                          <button type="button" className="btn btn--outline" onClick={() => setIsCreatingNews(false)}>Voltar à Lista</button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              )}

              {/* TAB: USUÁRIOS */}
              {activeTab === 'users' && currentUser.role === 'admin' && (
                <div className="admin-tab-content">
                  <div className="users-tab-layout">
                    <div className="user-create-card">
                      <h3><UserPlus size={18} /> Cadastrar Novo Usuário</h3>
                      <form onSubmit={handleCreateUser}>
                        <div className="admin-form-group"><label>Nome Completo *</label><input type="text" required placeholder="Ex: João Silva" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} /></div>
                        <div className="admin-form-group"><label>Nome de Usuário (Login) *</label><input type="text" required placeholder="Ex: joao.ibras" value={newUserUsername} onChange={(e) => setNewUserUsername(e.target.value)} /></div>
                        <div className="admin-form-group"><label>Senha Inicial *</label><input type="password" required placeholder="Mínimo 6 caracteres..." value={newUserPassword} onChange={(e) => setNewUserPassword(e.target.value)} /></div>
                        <div className="admin-form-group">
                          <label>Função / Permissão</label>
                          <select value={newUserRole} onChange={(e) => setNewUserRole(e.target.value as any)}>
                            <option value="editor">Editor (Publica e edita notícias)</option>
                            <option value="admin">Administrador (Acesso completo)</option>
                          </select>
                        </div>
                        <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '0.5rem' }}><span>Criar Usuário</span></button>
                      </form>
                    </div>
                    <div className="users-list-card">
                      <div className="users-list-header"><h3>Usuários Ativos do Painel</h3></div>
                      <div className="admin-table-wrap">
                        <table className="admin-table">
                          <thead><tr><th>Nome</th><th>Login</th><th>Função</th><th>Criado em</th><th>Ações</th></tr></thead>
                          <tbody>
                            {usersList.map((user) => (
                              <tr key={user.id}>
                                <td><strong>{user.name}</strong>{user.id === currentUser.id && <span className="current-user-tag"> (Você)</span>}</td>
                                <td><code>{user.username}</code></td>
                                <td><span className={`role-badge role-badge--${user.role}`}>{user.role === 'admin' ? 'Administrador' : 'Editor'}</span></td>
                                <td>{user.createdAt}</td>
                                <td>{user.id !== currentUser.id && <button type="button" className="action-icon-btn action-icon-btn--delete" onClick={() => handleDeleteUser(user.id)} title="Excluir"><Trash2 size={15} /></button>}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: SENHA */}
              {activeTab === 'profile' && (
                <div className="admin-tab-content">
                  <div className="profile-tab-layout">
                    <div className="profile-info-card">
                      <div className="profile-avatar"><ShieldCheck size={32} /></div>
                      <div><p className="profile-name">{currentUser.name}</p><p className="profile-username">@{currentUser.username}</p></div>
                      <span className={`role-badge role-badge--${currentUser.role}`}>{currentUser.role === 'admin' ? 'Administrador' : 'Editor'}</span>
                    </div>
                    <div className="password-change-card">
                      <h3><KeyRound size={18} /> Alterar Minha Senha</h3>
                      <form onSubmit={handleChangePassword}>
                        <div className="admin-form-group"><label>Senha Atual *</label><input type="password" required placeholder="Sua senha atual..." value={currentPasswordInput} onChange={(e) => setCurrentPasswordInput(e.target.value)} /></div>
                        <div className="admin-form-group"><label>Nova Senha *</label><input type="password" required placeholder="Nova senha (mín. 6 caracteres)..." value={newPasswordInput} onChange={(e) => setNewPasswordInput(e.target.value)} /></div>
                        <div className="admin-form-group"><label>Confirmar Nova Senha *</label><input type="password" required placeholder="Repita a nova senha..." value={confirmPasswordInput} onChange={(e) => setConfirmPasswordInput(e.target.value)} /></div>
                        <button type="submit" className="btn btn--primary" style={{ width: '100%', marginTop: '0.5rem' }}><span>Salvar Nova Senha</span></button>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  )
}
