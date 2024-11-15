'use client';

import { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseStats from '../components/ExpenseStats';

export default function ExpensesPage() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0], // Last month
    endDate: new Date().toISOString().split('T')[0] // Today
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-8">
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-0">Statistics</h2>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">From</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900 focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">To</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="px-3 py-2 border border-slate-200 rounded-md text-sm text-slate-900 focus:ring-2 focus:ring-slate-800 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <ExpenseStats dateRange={dateRange} />
      </div>
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-lg sm:text-xl font-semibold mb-4">Recent Expenses</h2>
        <ExpenseList dateRange={dateRange} />
      </div>
    </div>
  );
} 