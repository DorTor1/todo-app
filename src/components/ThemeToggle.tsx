import React, { useEffect, useState } from 'react';

const ThemeToggle: React.FC = () => {
  // Состояние для отслеживания текущей темы
  const [isDarkTheme, setIsDarkTheme] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  // Применение темы при изменении состояния
  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkTheme]);

  // Переключение темы
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >
      {isDarkTheme ? 'Светлая тема' : 'Темная тема'}
    </button>
  );
};

export default ThemeToggle; 