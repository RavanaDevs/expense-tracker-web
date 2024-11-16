import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Expense, UserSettings, DateRange } from '@/app/types';
import { DEFAULT_CURRENCY_SETTINGS, DEFAULT_QUICK_AMOUNTS, DEFAULT_CATEGORIES } from '@/app/constants';

// Helper function to create sample expenses
const createSampleExpenses = (): Expense[] => {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  return [
    {
      id: '1',
      amount: 25.50,
      category: 'food',
      date: new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0],
      description: 'Lunch at restaurant'
    },
    {
      id: '2',
      amount: 35.00,
      category: 'transportation',
      date: new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0],
      description: 'Taxi ride'
    },
    {
      id: '3',
      amount: 120.00,
      category: 'utilities',
      date: new Date(today.setDate(today.getDate() - 2)).toISOString().split('T')[0],
      description: 'Electricity bill'
    },
    {
      id: '4',
      amount: 15.99,
      category: 'entertainment',
      date: new Date(today.setDate(today.getDate() - 3)).toISOString().split('T')[0],
      description: 'Movie streaming subscription'
    },
    {
      id: '5',
      amount: 85.50,
      category: 'shopping',
      date: new Date(today.setDate(today.getDate() - 3)).toISOString().split('T')[0],
      description: 'New clothes'
    },
    {
      id: '6',
      amount: 45.00,
      category: 'food',
      date: new Date(today.setDate(today.getDate() - 4)).toISOString().split('T')[0],
      description: 'Groceries'
    },
    {
      id: '7',
      amount: 30.00,
      category: 'healthcare',
      date: new Date(today.setDate(today.getDate() - 5)).toISOString().split('T')[0],
      description: 'Pharmacy'
    },
    {
      id: '8',
      amount: 200.00,
      category: 'education',
      date: new Date(today.setDate(today.getDate() - 6)).toISOString().split('T')[0],
      description: 'Online course'
    },
    {
      id: '9',
      amount: 18.50,
      category: 'food',
      date: new Date(today.setDate(today.getDate() - 6)).toISOString().split('T')[0],
      description: 'Coffee and snacks'
    },
    {
      id: '10',
      amount: 60.00,
      category: 'transportation',
      date: new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0],
      description: 'Fuel'
    }
  ];
};

interface ExpenseStore {
  // Expenses
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  updateExpense: (id: string, updates: Partial<Expense>) => void;
  deleteExpense: (id: string) => void;
  
  // Settings
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  
  // Date Range
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

export const useStore = create<ExpenseStore>()(
  persist(
    (set) => ({
      // Initial state with sample expenses
      expenses: createSampleExpenses(),
      settings: {
        currency: DEFAULT_CURRENCY_SETTINGS,
        quickAmounts: DEFAULT_QUICK_AMOUNTS,
        categories: DEFAULT_CATEGORIES,
        theme: 'light',
      },
      dateRange: {
        startDate: new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0],
      },

      // Actions
      addExpense: (expense) => set((state) => ({
        expenses: [...state.expenses, {
          ...expense,
          id: Math.random().toString(36).substr(2, 9),
        }],
      })),

      updateExpense: (id, updates) => set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense.id === id ? { ...expense, ...updates } : expense
        ),
      })),

      deleteExpense: (id) => set((state) => ({
        expenses: state.expenses.filter((expense) => expense.id !== id),
      })),

      updateSettings: (newSettings) => set((state) => ({
        settings: {
          ...state.settings,
          ...newSettings,
        },
      })),

      setDateRange: (dateRange) => set({ dateRange }),
    }),
    {
      name: 'expense-store',
    }
  )
); 