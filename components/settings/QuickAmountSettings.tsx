'use client';

import { useState } from 'react';
import { QuickAmount } from '@/types';
import { DEFAULT_QUICK_AMOUNTS } from '@/constants/index';
import { formatCurrency } from '@/utils/currency';

interface QuickAmountSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickAmountSettings({ isOpen, onClose }: QuickAmountSettingsProps) {
  const [quickAmounts, setQuickAmounts] = useState<QuickAmount[]>(DEFAULT_QUICK_AMOUNTS);
  const [newAmount, setNewAmount] = useState('');

  const handleToggle = (id: string) => {
    setQuickAmounts(prev => 
      prev.map(amount => 
        amount.id === id ? { ...amount, enabled: !amount.enabled } : amount
      )
    );
  };

  const handleAdd = () => {
    const amount = parseFloat(newAmount);
    if (amount > 0) {
      const newId = (Math.max(...quickAmounts.map(a => parseInt(a.id))) + 1).toString();
      setQuickAmounts(prev => [...prev, { id: newId, amount, enabled: true }]);
      setNewAmount('');
    }
  };

  const handleRemove = (id: string) => {
    setQuickAmounts(prev => prev.filter(amount => amount.id !== id));
  };

  const handleSave = () => {
    // TODO: Save to global state/storage
    console.log('Saving quick amounts:', quickAmounts);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Add new amount */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full px-4 py-2.5 rounded-md border-0 text-slate-900 dark:text-white bg-white dark:bg-slate-700 ring-1 ring-inset ring-slate-200 dark:ring-slate-600 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 dark:focus:ring-slate-400"
            />
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2.5 rounded-md bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Quick amounts list */}
        <div className="space-y-2">
          {quickAmounts.sort((a, b) => a.amount - b.amount).map((amount) => (
            <div
              key={amount.id}
              className="flex items-center justify-between p-3 rounded-md bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-center space-x-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={amount.enabled}
                    onChange={() => handleToggle(amount.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-slate-800 dark:peer-checked:bg-slate-700"></div>
                </label>
                <span className="text-slate-900 dark:text-white font-medium">
                  {formatCurrency(amount.amount)}
                </span>
              </div>
              <button
                onClick={() => handleRemove(amount.id)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-3 py-2 rounded-md bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
} 