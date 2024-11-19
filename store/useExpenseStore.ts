import { create } from "zustand";
import { Expense, QuickAmount } from "@/types";
import { expenseService } from "@/services/expenses";

interface ExpenseStore {
  expenses: Expense[];
  isLoading: boolean;
  error: string | null;
  preferences: {
    quickAmounts: QuickAmount[];
  };

  setExpenses: (expenses: Expense[]) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  fetchExpensesByDate: (date: string) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Expense) => Promise<Expense>;
  addExpense: (expense: Expense) => Promise<Expense>;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  isLoading: false,
  error: null,
  preferences: {
    quickAmounts: [],
  },

  setExpenses: (expenses) => set({ expenses }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchExpensesByDate: async (date: string) => {
    set({ isLoading: true, error: null });
    try {
      const expenses = await expenseService.getByDate(date);
      set({ expenses, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch expenses", isLoading: false });
      console.error("Error fetching expenses:", error);
    }
  },

  updateExpense: async (id: string, updatedExpense: Expense) => {
    try {
      const expenseToUpdate = {
        ...updatedExpense,
        amount: Number(updatedExpense.amount),
      };

      const updated = await expenseService.updateExpense(id, expenseToUpdate);

      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense._id === id ? updated : expense
        ),
      }));
      return updated;
    } catch (error) {
      set({ error: "Failed to update expense" });
      console.error("Error updating expense:", error);
      throw error;
    }
  },

  addExpense: async (expense: Expense) => {
    try {
      const expenseToAdd = {
        ...expense,
        amount: Number(expense.amount),
      };

      const newExpense = await expenseService.createExpense(expenseToAdd);
      set((state) => ({
        expenses: [...state.expenses, newExpense],
      }));
      return newExpense;
    } catch (error) {
      set({ error: "Failed to add expense" });
      console.error("Error adding expense:", error);
      throw error;
    }
  },
}));
