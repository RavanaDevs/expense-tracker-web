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

export interface MongoType {
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
  category: ExpenseCategory;
  date: string;
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

export interface Category {
  id: string;
  value: string;
  label: string;
  emoji: string;
  enabled: boolean;
}

export interface UserSettings {
  currency: CurrencySettings;
  quickAmounts: QuickAmount[];
  categories: Category[];
  theme: Theme;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  settings: UserSettings;
}
