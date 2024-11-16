'use client';

import { useState } from 'react';
import ExpenseList from '../components/ExpenseList';
import ExpenseStats from '../components/ExpenseStats';
import { exportToCSV } from '../utils/export';

export default function ExpensesPage() {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  // Temporary mock data - in a real app, this would come from your data source
  const allExpenses = [
    { 
      id: 1, 
      amount: 50.00, 
      category: 'food' as const, 
      date: '2024-03-20',
      description: 'Lunch with colleagues'
    },
    // ... other expenses
  ];

  const handleExport = () => {
    const filteredExpenses = allExpenses.filter(expense => 
      expense.date >= dateRange.startDate && expense.date <= dateRange.endDate
    );
    exportToCSV(filteredExpenses);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-8">
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-0 text-slate-900 dark:text-white">Statistics</h2>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-slate-600 dark:text-slate-400 mb-1">From</label>
              <input
                type="date"
                value={dateRange.startDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-md text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-slate-600 dark:text-slate-400 mb-1">To</label>
              <input
                type="date"
                value={dateRange.endDate}
                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                className="px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-md text-sm text-slate-900 dark:text-white bg-white dark:bg-slate-700 focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent"
              />
            </div>
          </div>
        </div>
        <ExpenseStats dateRange={dateRange} />
      </div>
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">Recent Expenses</h2>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <span className="text-lg">📊</span>
            <span className="text-sm font-medium">Export CSV</span>
          </button>
        </div>
        <ExpenseList dateRange={dateRange} />
      </div>
    </div>
  );
} 