import { create } from "zustand";
import { Expense, QuickAmount } from "@/types";
import { expenseService } from "@/services/expenses";

interface ExpenseStore {
  expenses: Expense[];
  selectedExpense: Expense | null;
  isLoading: boolean;
  error: string | null;
  preferences: {
    quickAmounts: QuickAmount[];
  };

  setExpenses: (expenses: Expense[]) => void;
  setSelectedExpense: (selectedExpense: Expense | null) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  fetchAllExpenses: () => Promise<void>;
  fetchExpensesByDate: (date: string) => Promise<void>;
  fetchExpensesByDateRange: (
    startDate: string,
    endDate: string
  ) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Expense) => Promise<Expense>;
  addExpense: (expense: Expense) => Promise<Expense>;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  selectedExpense: null,
  isLoading: false,
  error: null,
  preferences: {
    quickAmounts: [],
  },

  setExpenses: (expenses) => set({ expenses }),
  setSelectedExpense: (selectedExpense) => set({ selectedExpense }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),

  fetchAllExpenses: async () => {
    const res = await expenseService.getAllExpenses();
    const data = await res.json();
    set((state) => ({ expenses: data }));
  },

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
  fetchExpensesByDateRange: async (startDate: string, endDate: string) => {
    set({ isLoading: true, error: null });
    try {
      const expenses = await expenseService.getByDateRange(startDate, endDate);
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
          expense._id === expenseToUpdate._id ? updated : expense
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
      const res = await expenseService.createExpense(expense);
      const data = await res.json();

      if (!data.expense) {
        set((state) => ({
          error: "Error! Expense not created.",
        }));
      }

      const newExpense: Expense = data.expense;

      set((state) => ({
        expenses: [newExpense, ...state.expenses],
      }));
      console.log(newExpense);
      return newExpense;
    } catch (error) {
      set({ error: "Failed to add expense" });
      console.error("Error adding expense:", error);
      throw error;
    }
  },
}));
