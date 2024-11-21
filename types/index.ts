import { string } from "zod";

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

export interface Category {
  id: string;
  value: string;
  label: string;
  emoji: string;
  enabled: boolean;
}
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Expense extends MongoType {
  amount: number;
  category: string;
  date: Date;
  description?: string;
}

export interface QuickAmount {
  id: string;
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

export interface ExpenseStats {
  total: number;
  average: number;
  highest: StatCategory;
  topCategory: StatCategory;
}

export interface StatCategory {
  category: string;
  count: number;
}
