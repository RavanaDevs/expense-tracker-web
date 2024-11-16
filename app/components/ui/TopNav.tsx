'use client';

import { useState } from 'react';
import { useTheme } from '@/app/contexts/ThemeContext';
import { toggleDrawer } from './SideDrawer';

export default function TopNav() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="sticky top-0 z-40 w-full bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Menu button and Title */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={toggleDrawer}
              className="p-2 rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <span className="text-xl">☰</span>
            </button>
            <h1 className="ml-4 text-xl font-semibold text-slate-900 dark:text-white">
              Expense Tracker
            </h1>
          </div>

          {/* Right side - Profile */}
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">JD</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-slate-900 dark:text-white">John Doe</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">john@example.com</p>
              </div>
            </button>

            {/* Profile Dropdown */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-slate-800 rounded-md shadow-lg border border-slate-200 dark:border-slate-700">
                <a
                  href="/settings"
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Settings
                </a>
                <a
                  href="/profile"
                  className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Profile
                </a>
                <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 