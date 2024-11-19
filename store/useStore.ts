import { create } from "zustand";
import { Expense, QuickAmount } from "@/types";
import { DEFAULT_QUICK_AMOUNTS } from "@/constants/index";
import { expenseService } from "@/services/expenses";

interface ExpenseStore {
  // State
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  preferences: {
    quickAmounts: QuickAmount[];
  };

  // Actions
  setExpenses: (expenses: Expense[]) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  fetchExpensesByDate: (date: string) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Expense) => Promise<void>;
  addExpense: (expense: Expense) => Promise<void>;
}

export const useExpenseStore = create<ExpenseStore>((set, get) => ({
  // Initial state
  expenses: [],
  isLoading: false,
  error: null,
  preferences: {
    quickAmounts: DEFAULT_QUICK_AMOUNTS,
  },

  // Setters
  setExpenses: (expenses) => set({ expenses }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  // Async actions
  fetchExpensesByDate: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      const expenses = await expenseService.getByDate(date);
      set({ expenses, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch expenses', isLoading: false });
      console.error('Error fetching expenses:', error);
    }
  },

  updateExpense: async (id: string, updatedExpense: Expense) => {
    try {
      const updated = await expenseService.updateExpense(id, updatedExpense);
      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense._id === id ? updated : expense
        ),
      }));
    } catch (error) {
      set({ error: 'Failed to update expense' });
      console.error('Error updating expense:', error);
    }
  },

  addExpense: async (expense: Expense) => {
    try {
      const newExpense = await expenseService.createExpense(expense);
      set((state) => ({
        expenses: [...state.expenses, newExpense],
      }));
    } catch (error) {
      set({ error: 'Failed to add expense' });
      console.error('Error adding expense:', error);
    }
  },
}));
