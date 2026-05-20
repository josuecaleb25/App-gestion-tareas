import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const themes = {
  default: {
    name: 'Por defecto',
    primary: '#8FAF8A',
    primaryLight: '#C8DFC4',
    primaryPale: '#EEF5EC',
    background: '#F5F0E8',
  },
  sage: {
    name: 'Verde Salvia',
    primary: '#8FAF8A',
    primaryLight: '#C8DFC4',
    primaryPale: '#EEF5EC',
    background: '#F0F5ED',
  },
  lavender: {
    name: 'Lavanda',
    primary: '#A89BC0',
    primaryLight: '#CFC7E0',
    primaryPale: '#EEE9F5',
    background: '#F3F0F8',
  },
  rose: {
    name: 'Rosa Pétalo',
    primary: '#F7C6C7',
    primaryLight: '#FBDCDD',
    primaryPale: '#FDF0F0',
    background: '#FFF0F1',
  },
  peach: {
    name: 'Durazno',
    primary: '#D4A898',
    primaryLight: '#E8C8BC',
    primaryPale: '#F8EDE9',
    background: '#F8F0EC',
  },
  sky: {
    name: 'Azul Cielo',
    primary: '#8BAFC4',
    primaryLight: '#B8D4E2',
    primaryPale: '#EAF2F7',
    background: '#EEF4F8',
  },
};

const useThemeStore = create(
  persist(
    (set, get) => ({
      currentTheme: 'rose',
      darkMode: false,
      
      setTheme: (themeKey) => {
        set({ currentTheme: themeKey });
      },

      toggleDarkMode: () => {
        set({ darkMode: !get().darkMode });
      },

      getTheme: () => {
        const key = get().currentTheme;
        return themes[key] || themes.default;
      },

      getThemes: () => themes,
    }),
    {
      name: 'theme-storage',
    }
  )
);

export default useThemeStore;