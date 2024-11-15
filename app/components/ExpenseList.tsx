'use client';

import { useState } from 'react';
import ExpenseDialog from './ExpenseDialog';
import Pagination from './Pagination';

interface ExpenseListProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export default function ExpenseList({ dateRange }: ExpenseListProps) {
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Temporary mock data with dates
  const allExpenses = [
    { 
      id: 1, 
      amount: 50.00, 
      category: 'food', 
      date: '2024-03-20',
      description: 'Lunch with colleagues'
    },
    { 
      id: 2, 
      amount: 2.50, 
      category: 'transport', 
      date: '2024-03-19',
      description: 'Bus fare'
    },
    { 
      id: 3, 
      amount: 30.00, 
      category: 'food', 
      date: '2024-03-15',
      description: 'Groceries'
    },
    { 
      id: 4, 
      amount: 15.00, 
      category: 'entertainment', 
      date: '2024-03-10',
      description: 'Movie ticket'
    },
    { 
      id: 5, 
      amount: 25.00, 
      category: 'food', 
      date: '2024-03-09',
      description: 'Dinner'
    },
    { 
      id: 6, 
      amount: 45.00, 
      category: 'utilities', 
      date: '2024-03-08',
      description: 'Internet bill'
    },
    // Add more mock data to test pagination
  ];

  // Filter expenses based on date range
  const filteredExpenses = allExpenses.filter(expense => {
    return expense.date >= dateRange.startDate && expense.date <= dateRange.endDate;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

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

  const handleExpenseClick = (expense: any) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  const handleSaveExpense = (updatedExpense: any) => {
    // In a real app, you would update the expense in your database
    console.log('Saving updated expense:', updatedExpense);
  };

  if (filteredExpenses.length === 0) {
    return (
      <div className="text-center py-8 text-slate-600">
        No expenses found for the selected date range
      </div>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {paginatedExpenses.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white cursor-pointer"
            onClick={() => handleExpenseClick(expense)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{getEmoji(expense.category)}</span>
              <div>
                <p className="text-sm text-slate-700 capitalize">{expense.category}</p>
                <p className="text-xs text-slate-500">{new Date(expense.date).toLocaleDateString()}</p>
              </div>
            </div>
            <span className="font-medium text-slate-900">${expense.amount.toFixed(2)}</span>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedExpense && (
        <ExpenseDialog
          isOpen={isDialogOpen}
          closeDialog={() => setIsDialogOpen(false)}
          expense={selectedExpense}
          onSave={handleSaveExpense}
        />
      )}
    </>
  );
} 