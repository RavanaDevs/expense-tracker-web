'use client';

import { useState } from 'react';
import ExpenseDialog from './ExpenseDialog';
import Pagination from './Pagination';
import ExpenseCard from './expenses/ExpenseCard';
import { useExpenses } from '@/store/selectors';
import { ITEMS_PER_PAGE } from '@/constants/index';
import { Expense } from '@/types';

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

  const { expenses, updateExpense, deleteExpense } = useExpenses();

  // Filter expenses based on date range
  const filteredExpenses = expenses.filter(expense => 
    expense.date >= dateRange.startDate && expense.date <= dateRange.endDate
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredExpenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  const handleSaveExpense = (updatedExpense: Expense) => {
    updateExpense(updatedExpense.id, updatedExpense);
    setIsDialogOpen(false);
  };

  if (filteredExpenses.length === 0) {
    return (
      <div className="text-center py-8 text-slate-600 dark:text-slate-400">
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