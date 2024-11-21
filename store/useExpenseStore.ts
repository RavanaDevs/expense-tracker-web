import { create } from "zustand";
import { Expense, QuickAmount } from "@/types";
import { expenseService } from "@/services/expenses";
import { useDateRangeStore } from "./dateRangeStore";

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
  fetchExpensesByDate: (date: Date) => Promise<void>;
  fetchExpensesByDateRange: (startDate: Date, endDate: Date) => Promise<void>;
  updateExpense: (id: string, updatedExpense: Expense) => Promise<Expense>;
  addExpense: (expense: Expense) => Promise<Expense>;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
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
