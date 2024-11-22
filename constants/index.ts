import { CurrencySettings, QuickAmount, Category } from "@/types";

export const DEFAULT_CURRENCY_SETTINGS: CurrencySettings = {
  symbol: "$",
  code: "USD",
  position: "before",
};

export const DEFAULT_QUICK_AMOUNTS: QuickAmount[] = [
  { amount: 10, enabled: true },
  { amount: 20, enabled: true },
  { amount: 50, enabled: true },
  { amount: 100, enabled: true },
  { amount: 500, enabled: true },
  { amount: 1000, enabled: true },
];

export const DEFAULT_CATEGORIES: Category[] = [
  {
    category: "Food & Dining",
    emoji: "🍽️",
    enabled: true,
  },
  {
    category: "Transport",
    emoji: "🚗",
    enabled: true,
  },
  {
    category: "Entertainment",
    emoji: "🎮",
    enabled: true,
  },
  {
    category: "Bills & Utilities",
    emoji: "📱",
    enabled: true,
  },
  { category: "Shopping", emoji: "🛍️", enabled: true },
  {
    category: "Healthcare",
    emoji: "🏥",
    enabled: true,
  },
  {
    category: "Education",
    emoji: "📚",
    enabled: true,
  },
  { category: "Other", emoji: "📌", enabled: true },
];

export const ITEMS_PER_PAGE = 10;

export const DATE_FORMAT = {
  display: "MMM dd, yyyy",
  input: "yyyy-MM-dd",
};
