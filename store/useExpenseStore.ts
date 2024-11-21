import { create } from "zustand";
import { Expense, ExpenseStats, QuickAmount } from "@/types";
import { expenseService } from "@/services/expenses";
import { useDateRangeStore } from "./dateRangeStore";

interface ExpenseStore {
  expenses: Expense[];
  expenseStats: ExpenseStats;
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
  fetchExpensesByDate: (date: Date) => Promise<void>;
  fetchExpensesByDateRange: (startDate: Date, endDate: Date) => Promise<void>;
  fetchExpenseStats: (
    startDate: Date | null,
    endDate: Date | null
  ) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Expense) => Promise<Expense>;
  addExpense: (expense: Expense) => Promise<Expense>;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  expenseStats: {
    total: 0,
    average: 0,
    highest: { category: "N/A", count: 0 },
    topCategory: { category: "N/A", count: 0 },
  },
  filteredExpensed: [],
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

  fetchExpensesByDate: async (date: Date) => {
    set({ isLoading: true, error: null });
    try {
      const res = await expenseService.getExpensesByDate(date);
      const expenses = await res.json();
      set({ expenses, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch expenses", isLoading: false });
      console.error("Error fetching expenses:", error);
    }
  },
  fetchExpensesByDateRange: async (startDate: Date, endDate: Date) => {
    set({ isLoading: true, error: null });
    try {
      const res = await expenseService.getExpensesByDateRange(
        startDate,
        endDate
      );
      const expenses = await res.json();
      set({ expenses, isLoading: false });
    } catch (error) {
      set({ error: "Failed to fetch expenses", isLoading: false });
      console.error("Error fetching expenses:", error);
    }
  },

  fetchExpenseStats: async (startDate, endDate) => {
    const res = await expenseService.getStats(startDate, endDate);
    const data = await res.json();
    set((state) => ({ expenseStats: data.stats }));
  },

  updateExpense: async (id: string, updatedExpense: Expense) => {
    try {
      const res = await expenseService.updateExpense(id, updatedExpense);
      const data = await res.json();
      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense._id === updatedExpense._id ? data.expense : expense
        ),
      }));
      return data.expense;
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
