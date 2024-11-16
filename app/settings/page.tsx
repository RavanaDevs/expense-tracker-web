'use client';

import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CurrencySettingsDialog from '../components/settings/CurrencySettingsDialog';
import { CURRENCY } from '../constants';

export default function SettingsPage() {
  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">Settings</h2>
        
        <div className="space-y-4">
          {/* Currency Settings */}
          <div 
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
            onClick={() => setIsCurrencyDialogOpen(true)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">Currency Settings</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Current: {CURRENCY.symbol} ({CURRENCY.code}) - {CURRENCY.position === 'before' ? 'Before amount' : 'After amount'}
                </p>
              </div>
              <span className="text-slate-400 dark:text-slate-500">→</span>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">Theme Settings</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Choose between light and dark theme
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <span className="text-lg">{theme === 'light' ? '🌞' : '🌙'}</span>
                <span className="text-sm font-medium">{theme === 'light' ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <CurrencySettingsDialog
        isOpen={isCurrencyDialogOpen}
        onClose={() => setIsCurrencyDialogOpen(false)}
      />
    </div>
  );
} 