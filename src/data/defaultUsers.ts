import type { AdminUser } from '../types/news'

// Default admin: user "admin" / initial password "ibras2026"
export const DEFAULT_ADMINS: AdminUser[] = [
  {
    id: 'user-1',
    username: 'admin',
    name: 'Administrador IBRAS',
    role: 'admin',
    passwordHash: '4795e2e20934da73bdc13e70c918e977c1b8ae51887a5c569d97ba7a0860f09f', // sha256 of 'ibras2026'
    createdAt: '2026-01-01'
  }
]
