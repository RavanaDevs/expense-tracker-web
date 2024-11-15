import { ExpenseCategory } from "@/app/types";

export const ITEMS_PER_PAGE = 5;

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