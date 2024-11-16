import { ExpenseCategory, CurrencySettings, QuickAmount } from '@/app/types';

export const DEFAULT_CURRENCY_SETTINGS: CurrencySettings = {
  symbol: '$',
  code: 'USD',
  position: 'before',
};

export const DEFAULT_QUICK_AMOUNTS: QuickAmount[] = [
  { id: '1', amount: 10, enabled: true },
  { id: '2', amount: 20, enabled: true },
  { id: '3', amount: 50, enabled: true },
  { id: '4', amount: 100, enabled: true },
  { id: '5', amount: 500, enabled: true },
  { id: '6', amount: 1000, enabled: true },
];

export const CATEGORY_OPTIONS = [
  { value: 'food', label: 'Food & Dining', emoji: '🍽️' },
  { value: 'transportation', label: 'Transportation', emoji: '🚗' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎮' },
  { value: 'utilities', label: 'Bills & Utilities', emoji: '📱' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'healthcare', label: 'Healthcare', emoji: '🏥' },
  { value: 'education', label: 'Education', emoji: '📚' },
  { value: 'other', label: 'Other', emoji: '📌' },
] as const;

export const CATEGORY_EMOJIS: Record<ExpenseCategory, string> = 
  Object.fromEntries(
    CATEGORY_OPTIONS.map(opt => [opt.value, opt.emoji])
  ) as Record<ExpenseCategory, string>;

export const ITEMS_PER_PAGE = 10;

export const DATE_FORMAT = {
  display: 'MMM dd, yyyy',
  input: 'yyyy-MM-dd',
}; 