'use client';

import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ExpenseDialogProps {
  isOpen: boolean;
  closeDialog: () => void;
  expense: {
    id: number;
    amount: number;
    category: string;
    date: string;
    description?: string;
  };
  onSave: (updatedExpense: any) => void;
}

export default function ExpenseDialog({ isOpen, closeDialog, expense, onSave }: ExpenseDialogProps) {
  const [editedExpense, setEditedExpense] = useState({
    ...expense,
    description: expense.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedExpense);
    closeDialog();
  };

  const getEmoji = (category: string) => {
    const emojis: {[key: string]: string} = {
      food: '🍕',
      transport: '🚗',
      utilities: '🏠',
      entertainment: '🎮',
      other: '📦'
    };
    return emojis[category] || '📦';
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeDialog}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getEmoji(editedExpense.category)}</span>
                      <Dialog.Title as="h3" className="text-lg font-medium text-slate-900 capitalize">
                        {editedExpense.category}
                      </Dialog.Title>
                    </div>
                    <span className="text-sm text-slate-500">
                      {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Amount
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-slate-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        value={editedExpense.amount}
                        onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
                        className="block w-full rounded-md border-0 py-1.5 pl-7 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={editedExpense.date}
                      onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={editedExpense.description}
                      onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                      className="block w-full rounded-md border-0 py-1.5 text-slate-900 ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-slate-800 sm:text-sm sm:leading-6"
                      rows={3}
                      placeholder="Add a description..."
                    />
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={closeDialog}
                      className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
} 