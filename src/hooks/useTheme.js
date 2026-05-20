import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';

// Hook que aplica las CSS variables del tema al document
export function useThemeApply() {
  const { currentTheme, getTheme } = useThemeStore();

  useEffect(() => {
    const theme = getTheme();
    const root = document.documentElement;
    
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    root.style.setProperty('--color-primary-pale', theme.primaryPale);
    root.style.setProperty('--color-background', theme.background);
  }, [currentTheme]);
}

// Hook para obtener los colores del tema actual
export function useThemeColors() {
  const { getTheme } = useThemeStore();
  return getTheme();
}