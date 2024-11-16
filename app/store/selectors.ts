import { useStore } from './useStore';
import { CurrencySettings, DateRange, QuickAmount } from '@/app/types';

export const useExpenses = () => {
    const store = useStore();
    const dateRange = store.dateRange;

    const filteredExpenses = store.expenses.filter(expense =>
        expense.date >= dateRange.startDate && expense.date <= dateRange.endDate
    );

    return {
        expenses: filteredExpenses,
        addExpense: store.addExpense,
        updateExpense: store.updateExpense,
        deleteExpense: store.deleteExpense,
        dateRange,
        setDateRange: store.setDateRange,
    };
};

export const useSettings = () => {
    const store = useStore();
    return {
        settings: store.settings,
        updateSettings: store.updateSettings,
    };
};

export const useQuickAmounts = () => {
    const store = useStore();
    return {
        quickAmounts: store.settings.quickAmounts,
        updateQuickAmounts: (quickAmounts: QuickAmount[]) =>
            store.updateSettings({ quickAmounts }),
    };
};

export const useCurrencySettings = () => {
    const store = useStore();
    return {
        currency: store.settings.currency,
        updateCurrency: (currency: CurrencySettings) =>
            store.updateSettings({ currency }),
    };
}; 