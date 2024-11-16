export interface Expense {
  id: number;
  amount: number;
  category: ExpenseCategory;
  date: string;
  description?: string;
}

export type ExpenseCategory = 'food' | 'transport' | 'utilities' | 'entertainment' | 'other';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
}

export type CurrencyPosition = 'before' | 'after';

export interface QuickAmount {
  id: string;
  amount: number;
  enabled: boolean;
}

export interface Settings {
  currency: {
    symbol: string;
    code: string;
    position: CurrencyPosition;
  };
  quickAmounts: QuickAmount[];
} 