import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const ThemeContext = createContext();

// Cria o provedor (quem vai "espalhar" o tema pro app)
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Aqui definimos as cores globais para facilitar
  const colors = isDark 
    ? { // CORES DO MODO ESCURO
        background: '#121212',
        cardBg: '#1E1E1E',
        text: '#FFFFFF',
        subText: '#AAAAAA',
        border: '#333333',
        statusBarStyle: 'light-content'
      } 
    : { // CORES DO MODO CLARO (Padrão atual)
        background: '#F9F9FB',
        cardBg: '#FFFFFF',
        text: '#4A0404', // Aquele vinho escuro do título
        subText: '#666666',
        border: '#E0E0E0',
        statusBarStyle: 'dark-content'
      };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Um atalho para facilitar o uso nas telas
export const useTheme = () => useContext(ThemeContext);