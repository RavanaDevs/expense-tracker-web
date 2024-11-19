import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Expense, UserSettings, DateRange, QuickAmount } from "@/types";
import {
  DEFAULT_CURRENCY_SETTINGS,
  DEFAULT_QUICK_AMOUNTS,
  DEFAULT_CATEGORIES,
} from "@/constants/index";
import axios from "axios";

interface ExpenseStore {
  preferences: {
    quickAmounts: QuickAmount[];
    // ... other preference properties ...
  };
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  isLoading: boolean;
  error: string | null;
  setError: (err: string) => void;
  setLoading: (loading: boolean) => void;
  updateExpense: (id: string, updatedExpense: Expense) => void;
  addExpense: (expense: Expense) => void;
}

export const useExpenseStore = create<ExpenseStore>((set) => ({
  preferences: {
    quickAmounts: DEFAULT_QUICK_AMOUNTS,
  },
  expenses: [],
  isLoading: false,
  error: null,
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
  setExpenses: (expenses) => set({ expenses }),
  updateExpense: (id, updatedExpense) => {
    set((state) => ({
      expenses: state.expenses.map((expense) =>
        expense.id === id ? updatedExpense : expense
      ),
    }));
  },
  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),
}));

// fetchTodayExpenses: async () => {
//   set({ isLoading: true, error: null });
//   try {
//     console.log("trying")
//     const today = new Date().toISOString();
//     const response = await axios.get(
//       `http://localhost:5000/expense/date/${today}`
//     );
//     console.log(response);
//     set({ expenses: response.data, isLoading: false });
//   } catch (error) {
//     set({ error: "Failed to fetch expenses", isLoading: false });
//   }
// },
