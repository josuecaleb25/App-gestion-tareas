import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';

// Hook que aplica las CSS variables del tema al document
export function useThemeApply() {
  const { currentTheme, darkMode, getTheme } = useThemeStore();

  useEffect(() => {
    const theme = getTheme();
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    root.style.setProperty('--color-primary-pale', theme.primaryPale);
    
    if (darkMode) {
      root.style.setProperty('--color-background', '#1E1C1A');
      root.style.setProperty('--color-card', '#2A2724');
      root.style.setProperty('--color-text', '#EDE6D8');
      root.style.setProperty('--color-text-muted', '#9E9688');
      root.style.setProperty('--color-border', 'rgba(200,180,150,0.12)');
      document.body.classList.add('dark-mode');
    } else {
      root.style.setProperty('--color-background', theme.background);
      root.style.setProperty('--color-card', '#FDFAF5');
      root.style.setProperty('--color-text', '#5A5550');
      root.style.setProperty('--color-text-muted', '#8A847C');
      root.style.setProperty('--color-border', 'rgba(168,137,108,0.15)');
      document.body.classList.remove('dark-mode');
    }
  }, [currentTheme, darkMode]);
}

// Hook para obtener los colores del tema actual
export function useThemeColors() {
  const { getTheme, darkMode } = useThemeStore();
  const theme = getTheme();
  
  return {
    ...theme,
    darkMode,
    card: darkMode ? '#2A2724' : '#FDFAF5',
    text: darkMode ? '#EDE6D8' : '#5A5550',
    textMuted: darkMode ? '#9E9688' : '#8A847C',
    border: darkMode ? 'rgba(200,180,150,0.12)' : 'rgba(168,137,108,0.15)',
  };
}