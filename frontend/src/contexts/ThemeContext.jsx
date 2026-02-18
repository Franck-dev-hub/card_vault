import { createContext, useContext, useState, useEffect } from 'react';


const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  // Récupérer le thème sauvegardé ou utiliser la préférence système
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    
    // Utilise la préférence système si aucun thème sauvegardé
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });


  // Appliquer le thème au document et le sauvegarder
  useEffect(() => {
    const root = document.documentElement;
    
    // Applique l'attribut data-theme pour DaisyUI
    root.setAttribute('data-theme', theme);
    
    // Ajoute/supprime la classe 'dark' pour Tailwind CSS
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Sauvegarde dans localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);


  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };


  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark',
  };


  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};


// Hook personnalisé pour utiliser le thème 
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
