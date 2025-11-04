import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme } from '@/lib/supabase';

interface ThemeContextType {
  currentTheme: Theme | null;
  applyTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const defaultTheme: Theme = {
  id: 'default',
  name: 'Default Light',
  description: 'Clean and minimal light theme',
  price: 0,
  theme_config: {
    primary: '#6366f1',
    secondary: '#4f46e5',
    accent: '#818cf8',
    background: '#ffffff',
    card: '#f9fafb',
    text: '#1f2937',
  },
  is_premium: false,
  created_at: '',
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultTheme);

  const applyTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    
    // Apply theme colors to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.theme_config.primary);
    root.style.setProperty('--color-secondary', theme.theme_config.secondary);
    root.style.setProperty('--color-accent', theme.theme_config.accent);
    root.style.setProperty('--color-background', theme.theme_config.background);
    root.style.setProperty('--color-card', theme.theme_config.card);
    root.style.setProperty('--color-text', theme.theme_config.text);
    
    // Save to localStorage
    localStorage.setItem('idlely-theme', JSON.stringify(theme));
  };

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('idlely-theme');
    if (savedTheme) {
      try {
        const theme = JSON.parse(savedTheme);
        applyTheme(theme);
      } catch (error) {
        console.error('Failed to load saved theme:', error);
      }
    } else {
      applyTheme(defaultTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, applyTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}