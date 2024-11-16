'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Create a custom event type
const TOGGLE_DRAWER_EVENT = 'toggleDrawer';

// Create a custom event for drawer toggle
export const toggleDrawer = () => {
  const event = new CustomEvent(TOGGLE_DRAWER_EVENT);
  window.dispatchEvent(event);
};

export default function SideDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Add Expense', icon: '➕' },
    { href: '/expenses', label: 'History', icon: '📊' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  // Listen for toggle events
  useEffect(() => {
    const handleToggle = () => setIsOpen(prev => !prev);
    window.addEventListener(TOGGLE_DRAWER_EVENT, handleToggle);
    return () => window.removeEventListener(TOGGLE_DRAWER_EVENT, handleToggle);
  }, []);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-200 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors ${
                  pathname === item.href
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
} 