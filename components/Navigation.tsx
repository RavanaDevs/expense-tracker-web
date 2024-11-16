'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="mb-8">
      <div className="border-b border-slate-200">
        <div className="flex justify-center space-x-12">
          <Link
            href="/"
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              pathname === '/'
                ? 'border-slate-800 text-slate-800'
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            Add
          </Link>
          <Link
            href="/expenses"
            className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              pathname === '/expenses'
                ? 'border-slate-800 text-slate-800'
                : 'border-transparent text-slate-600 hover:text-slate-800 hover:border-slate-300'
            }`}
          >
            History
          </Link>
        </div>
      </div>
    </nav>
  );
} 