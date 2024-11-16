'use client';

import { useTheme } from '@/app/contexts/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-4 py-3 rounded-md transition-colors text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
    >
      <span className="text-xl">{theme === 'light' ? '🌞' : '🌙'}</span>
      <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
} 