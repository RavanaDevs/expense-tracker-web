import { Expense } from "@/types";
import { useDateRangeStore } from "./dateRangeStore";
import { useExpenseStore } from "./useExpenseStore";
import { useSettingsStore } from "./useSettingsStore";

export const useFilteredExpense = () => {
  const { startDate, endDate } = useDateRangeStore();
  const { expenses, isLoading, error } = useExpenseStore();

  let filtered: Expense[] = [];

  if (startDate && endDate) {
    filtered = expenses.filter((e) => e.date >= startDate && e.date <= endDate);
  } else if (startDate) {
    filtered = expenses.filter(
      (e) => e.date >= startDate && e.date <= startDate
    );
  } else {
    filtered = expenses;
  }
  console.log(expenses, filtered);
  return {
    expenses: filtered,
  };
};

export const useCurrencySettings = () => {
  const {
    settings: { currency },
    updateCurrencySettings,
  } = useSettingsStore();
  return {
    currency,
    updateCurrencySettings,
  };
};

export const useDateRange = () => {
  const {
    settings: { dateRange },
    updateDateRange,
  } = useSettingsStore();
  return {
    dateRange,
    updateDateRange,
  };
};
