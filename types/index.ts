import { string } from "zod";

export type Theme = "light" | "dark";

export type CurrencyPosition = "before" | "after";

interface MongoType {
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: string;
}

export interface Category {
  category: string;
  emoji: string;
  enabled: boolean;
}
export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Expense extends MongoType {
  amount: number;
  category: Category;
  date: Date;
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
  currencySettings: CurrencySettings;
  quickAmounts: QuickAmount[];
  categories: Category[];
}

export interface ExpenseStats {
  total: number;
  average: number;
  highest: StatCategory;
  topCategory: StatCategory;
}

export interface StatCategory {
  category: Category | null;
  count: number;
}
