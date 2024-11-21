import {
  ExpenseCategory,
  CurrencySettings,
  QuickAmount,
  Category,
} from "@/types";

export const DEFAULT_CURRENCY_SETTINGS: CurrencySettings = {
  symbol: "$",
  code: "USD",
  position: "before",
};

export const DEFAULT_QUICK_AMOUNTS: QuickAmount[] = [
  { id: "1", amount: 10, enabled: true },
  { id: "2", amount: 20, enabled: true },
  { id: "3", amount: 50, enabled: true },
  { id: "4", amount: 100, enabled: true },
  { id: "5", amount: 500, enabled: true },
  { id: "6", amount: 1000, enabled: true },
];

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "1",
    value: "food",
    label: "Food & Dining",
    emoji: "🍽️",
    enabled: true,
  },
  {
    id: "2",
    value: "transportation",
    label: "Transportation",
    emoji: "🚗",
    enabled: true,
  },
  {
    id: "3",
    value: "entertainment",
    label: "Entertainment",
    emoji: "🎮",
    enabled: true,
  },
  {
    id: "4",
    value: "utilities",
    label: "Bills & Utilities",
    emoji: "📱",
    enabled: true,
  },
  { id: "5", value: "shopping", label: "Shopping", emoji: "🛍️", enabled: true },
  {
    id: "6",
    value: "healthcare",
    label: "Healthcare",
    emoji: "🏥",
    enabled: true,
  },
  {
    id: "7",
    value: "education",
    label: "Education",
    emoji: "📚",
    enabled: true,
  },
  { id: "8", value: "other", label: "Other", emoji: "📌", enabled: true },
];

export const CATEGORY_OPTIONS = [
  { value: "food", label: "Food", emoji: "🍕 " },
  { value: "transport", label: "Transport", emoji: "🚗 " },
  { value: "entertainment", label: "Entertainment", emoji: "🎮 " },
  { value: "shopping", label: "Shopping", emoji: "🛍️ " },
  { value: "bills", label: "Bills", emoji: "📄 " },
  { value: "other", label: "Other", emoji: "📌 " },
];

export const CATEGORY_EMOJIS: Record<ExpenseCategory, string> =
  Object.fromEntries(
    DEFAULT_CATEGORIES.map((cat) => [cat.value, cat.emoji])
  ) as Record<ExpenseCategory, string>;

export const ITEMS_PER_PAGE = 10;

export const DATE_FORMAT = {
  display: "MMM dd, yyyy",
  input: "yyyy-MM-dd",
};
