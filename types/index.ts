export type Theme = "light" | "dark";

export type CurrencyPosition = "before" | "after";

export type ExpenseCategory =
  | "food"
  | "transportation"
  | "entertainment"
  | "utilities"
  | "shopping"
  | "healthcare"
  | "education"
  | "other";

interface MongoType {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Expense extends MongoType {
  amount: number;
  category: string;
  date?: Date;
  description?: string;
}

export interface QuickAmount {
  amount: number;
  enabled: boolean;
}

export interface CurrencySettings {
  symbol: string;
  code: string;
  position: CurrencyPosition;
}

export interface Settings {
  currency: CurrencySettings;
  quickAmounts: QuickAmount[];
  dateRange: DateRange;
  categories: string[];
}
