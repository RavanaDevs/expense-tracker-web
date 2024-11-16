import { ExpenseCategory, CurrencyPosition, QuickAmount } from "@/app/types";

export const ITEMS_PER_PAGE = 5;

export const CURRENCY = {
  symbol: 'Rs.',
  code: 'LKR',
  position: 'after' as CurrencyPosition
};

export const DEFAULT_QUICK_AMOUNTS: QuickAmount[] = [
  { id: '1', amount: 10, enabled: true },
  { id: '2', amount: 20, enabled: true },
  { id: '3', amount: 50, enabled: true },
  { id: '4', amount: 100, enabled: true },
  { id: '5', amount: 500, enabled: true },
  { id: '6', amount: 1000, enabled: true },
];

export const CATEGORY_EMOJIS: Record<ExpenseCategory, string> = {
  food: '🍕',
  transport: '🚗',
  utilities: '🏠',
  entertainment: '🎮',
  other: '📦'
};

export const CATEGORY_OPTIONS = [
  { value: 'food', label: '🍕 Food' },
  { value: 'transport', label: '🚗 Transport' },
  { value: 'utilities', label: '🏠 Utilities' },
  { value: 'entertainment', label: '🎮 Entertainment' },
  { value: 'other', label: '📦 Other' }
]; 