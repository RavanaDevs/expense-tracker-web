'use client';

import { useState } from 'react';
import ExpenseDialog from './ExpenseDialog';
import Pagination from './Pagination';
import ExpenseCard from './expenses/ExpenseCard';
import { Expense } from '@/app/types';
import { ITEMS_PER_PAGE } from '@/app/constants';

interface ExpenseListProps {
  dateRange: {
    startDate: string;
    endDate: string;
  };
}

export default function ExpenseList({ dateRange }: ExpenseListProps) {
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Temporary mock data with dates
  const allExpenses = [
    { 
      id: 1, 
      amount: 50.00, 
      category: 'food' as const, 
      date: '2024-03-20',
      description: 'Lunch with colleagues'
    },
    { 
      id: 2, 
      amount: 2.50, 
      category: 'transport' as const, 
      date: '2024-03-19',
      description: 'Bus fare'
    },
    { 
      id: 3, 
      amount: 30.00, 
      category: 'food' as const, 
      date: '2024-03-15',
      description: 'Groceries'
    },
    { 
      id: 4, 
      amount: 15.00, 
      category: 'entertainment' as const, 
      date: '2024-03-10',
      description: 'Movie ticket'
    },
    { 
      id: 5, 
      amount: 25.00, 
      category: 'food' as const, 
      date: '2024-03-09',
      description: 'Dinner'
    },
    { 
      id: 6, 
      amount: 45.00, 
      category: 'utilities' as const, 
      date: '2024-03-08',
      description: 'Internet bill'
    },
  ];

  // Filter expenses based on date range
  const filteredExpenses = allExpenses.filter(expense => {
    return expense.date >= dateRange.startDate && expense.date <= dateRange.endDate;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  const handleSaveExpense = (updatedExpense: Expense) => {
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
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onClick={handleExpenseClick}
          />
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