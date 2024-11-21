import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Settings, DateRange, CurrencySettings } from "@/types";
import {
  DEFAULT_CURRENCY_SETTINGS,
  DEFAULT_QUICK_AMOUNTS,
} from "@/constants/index";

interface SettingsStore {
  settings: Settings;
  updateDateRange: (dateRange: DateRange) => void;
  updateCurrencySettings: (settings: CurrencySettings) => void;
}

const getDefaultDateRange = (): DateRange => {
  const today = new Date();
  const startDate = new Date();
  startDate.setMonth(today.getMonth() - 1);

  return {
    startDate: startDate.toISOString().split("T")[0],
    endDate: today.toISOString().split("T")[0],
  };
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        currency: DEFAULT_CURRENCY_SETTINGS,
        quickAmounts: DEFAULT_QUICK_AMOUNTS,
        dateRange: getDefaultDateRange(),
        categories: [],
      },
      updateDateRange: (dateRange) =>
        set((state) => ({
          settings: { ...state.settings, dateRange },
        })),
      updateCurrencySettings: (currency) =>
        set((state) => ({
          settings: { ...state.settings, currency },
        })),
    }),
    {
      name: "settings-store",
    }
  )
);
