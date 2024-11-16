import { useState, useCallback } from 'react';
import { Expense, DateRange } from '@/types';
import { expenseService } from '@/services/api';
import { useToast } from './useToast';

export function useExpenses(initialDateRange: DateRange) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { showToast } = useToast();

  const fetchExpenses = useCallback(async (dateRange: DateRange) => {
    try {
      setIsLoading(true);
      const data = await expenseService.getByDateRange(dateRange);
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch expenses'));
      showToast('error', 'Failed to load expenses');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  const addExpense = useCallback(async (expense: Omit<Expense, 'id'>) => {
    try {
      const newExpense = await expenseService.create(expense);
      setExpenses(prev => [...prev, newExpense]);
      showToast('success', 'Expense added successfully');
      return newExpense;
    } catch (err) {
      showToast('error', 'Failed to add expense');
      throw err;
    }
  }, [showToast]);

  const updateExpense = useCallback(async (id: string, updates: Partial<Expense>) => {
    try {
      const updatedExpense = await expenseService.update(id, updates);
      setExpenses(prev => 
        prev.map(exp => exp.id === id ? updatedExpense : exp)
      );
      showToast('success', 'Expense updated successfully');
      return updatedExpense;
    } catch (err) {
      showToast('error', 'Failed to update expense');
      throw err;
    }
  }, [showToast]);

  const deleteExpense = useCallback(async (id: string) => {
    try {
      await expenseService.delete(id);
      setExpenses(prev => prev.filter(exp => exp.id !== id));
      showToast('success', 'Expense deleted successfully');
    } catch (err) {
      showToast('error', 'Failed to delete expense');
      throw err;
    }
  }, [showToast]);

  return {
    expenses,
    isLoading,
    error,
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
} 