"use client";

import { useState, useEffect } from "react";
import ExpenseDialog from "./ExpenseDialog";
import Pagination from "./Pagination";
import ExpenseCard from "./expenses/ExpenseCard";
import { useExpenseStore } from "@/store/useExpenseStore";
import { useExpenses } from "@/store/selectors";
import { ITEMS_PER_PAGE } from "@/constants/index";
import { Expense } from "@/types";
import { useDateRangeStore } from "@/store/dateRangeStore";
import { dateAsIsoString } from "@/utils/date";

export default function ExpenseList() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { updateExpense, setSelectedExpense, selectedExpense } =
    useExpenseStore();
  const { expenses, isLoading, error } = useExpenses();

  useEffect(() => {}, [expenses]);

  if (isLoading) {
    return <div className="text-center py-8">Loading expenses...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  // Calculate pagination
  const totalPages = Math.ceil(expenses.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = expenses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleExpenseClick = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsDialogOpen(true);
  };

  const handleSaveExpense = (updatedExpense: Expense) => {
    updateExpense(updatedExpense._id!, updatedExpense);
    setIsDialogOpen(false);
  };

  if (expenses.length === 0) {
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
            key={expense._id}
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
          closeDialog={() => {setIsDialogOpen(false); setSelectedExpense(null)}}
          expense={selectedExpense}
          onSave={handleSaveExpense}
        />
      )}
    </>
  );
}
