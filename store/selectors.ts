import { useExpenseStore } from './useExpenseStore';
import { useSettingsStore } from './useSettingsStore';

export const useExpenses = () => {
  const { settings: { dateRange } } = useSettingsStore();
  const { expenses, isLoading, error } = useExpenseStore();

  const filteredExpenses = expenses.filter(expense => 
    expense.date >= dateRange.startDate && 
    expense.date <= dateRange.endDate
  );

  return {
    expenses: filteredExpenses,
    isLoading,
    error,
    dateRange,
  };
};

export const useCurrencySettings = () => {
  const { settings: { currency }, updateCurrencySettings } = useSettingsStore();
  return {
    currency,
    updateCurrencySettings,
  };
};

export const useDateRange = () => {
  const { settings: { dateRange }, updateDateRange } = useSettingsStore();
  return {
    dateRange,
    updateDateRange,
  };
};
