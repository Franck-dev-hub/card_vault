import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

/**
 * Provides theme state and toggle functionality to the component tree.
 * Keeping theme management in context avoids duplicating localStorage reads
 * and media-query checks across multiple components.
 *
 * @param {{ children: React.ReactNode }} props
 */
export const ThemeProvider = ({ children }) => {
  // Initialise theme lazily so localStorage and matchMedia are only read
  // once at mount time rather than on every render.
  // Priority: persisted user preference > OS-level color scheme preference.
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Synchronise the DOM and localStorage whenever the active theme changes.
  // Both attributes must be updated together because DaisyUI reads
  // `data-theme` while Tailwind's dark-mode utilities rely on the `dark` class.
  useEffect(() => {
    const root = document.documentElement;

    // DaisyUI uses data-theme on <html> to apply its component colour tokens.
    root.setAttribute('data-theme', theme);

    // Tailwind's `dark:` variants are gated on the presence of this class
    // when dark mode is configured as 'class' in tailwind.config.js.
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist the choice so it survives page refreshes and future visits.
    localStorage.setItem('theme', theme);
  }, [theme]); // Re-run only when the user actively switches the theme.

  // Toggles between the two supported themes without exposing the
  // switching logic to every consumer.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    // Derived boolean so consumers don't have to compare strings themselves.
    isDark: theme === 'dark',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook that provides access to the theme context.
 * Throws an error when called outside of ThemeProvider so misconfigured
 * component trees fail loudly instead of silently rendering with no theme.
 *
 * @returns {{ theme: string, setTheme: Function, toggleTheme: Function, isDark: boolean }}
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
