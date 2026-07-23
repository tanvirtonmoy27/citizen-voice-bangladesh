import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Role } from '../types';

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  districtId?: string;
  departmentId?: string;
}

const DEMO_USERS: Record<Role, DemoUser> = {
  citizen: { id: 'citizen-1', name: 'Md. Rakibul Hasan', email: '[email protected]', role: 'citizen', districtId: 'rajshahi' },
  officer: { id: 'officer-1', name: 'Engr. Anisur Rahman', email: '[email protected]', role: 'officer', departmentId: 'rhd', districtId: 'rajshahi' },
  admin: { id: 'admin-1', name: 'Farida Begum', email: '[email protected]', role: 'admin', departmentId: 'lgd' },
  super_admin: { id: 'super-1', name: 'System Administrator', email: '[email protected]', role: 'super_admin' },
};

interface AuthContextValue {
  user: DemoUser | null;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(() => {
    const stored = localStorage.getItem('cvb_user');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('cvb_user', JSON.stringify(user));
    else localStorage.removeItem('cvb_user');
  }, [user]);

  const loginAs = (role: Role) => setUser(DEMO_USERS[role]);
  const logout = () => setUser(null);

  return <AuthContext.Provider value={{ user, loginAs, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
