'use client';

import { useState } from 'react';

export default function ExpenseForm() {
  const [expense, setExpense] = useState({
    amount: '',
    category: 'other'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(expense);
    setExpense({ amount: '', category: 'other' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-600 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({...expense, amount: e.target.value})}
            placeholder="0.00"
            className="block w-full rounded-md border-0 py-3 pl-7 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 text-lg bg-white"
            required
          />
        </div>
      </div>
      <div>
        <select
          value={expense.category}
          onChange={(e) => setExpense({...expense, category: e.target.value})}
          className="block w-full rounded-md border-0 py-3 text-slate-900 ring-1 ring-inset ring-slate-200 focus:ring-2 focus:ring-inset focus:ring-slate-800 bg-white"
        >
          <option value="food">🍕 Food</option>
          <option value="transport">🚗 Transport</option>
          <option value="utilities">🏠 Utilities</option>
          <option value="entertainment">🎮 Entertainment</option>
          <option value="other">📦 Other</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-slate-800 text-white py-3 rounded-md text-sm font-medium hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 transition-colors"
      >
        Add Expense
      </button>
    </form>
  );
} 