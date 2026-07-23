import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleMode: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(() => (localStorage.getItem('cvb_theme') as ThemeMode) || 'light');
  const [highContrast, setHighContrast] = useState<boolean>(() => localStorage.getItem('cvb_contrast') === '1');

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'dark') root.classList.add('dark'); else root.classList.remove('dark');
    localStorage.setItem('cvb_theme', mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) root.classList.add('hc'); else root.classList.remove('hc');
    localStorage.setItem('cvb_contrast', highContrast ? '1' : '0');
  }, [highContrast]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode: () => setMode(m => (m === 'light' ? 'dark' : 'light')),
        highContrast,
        toggleHighContrast: () => setHighContrast(h => !h),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
