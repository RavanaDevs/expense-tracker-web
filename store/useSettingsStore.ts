import {
  DEFAULT_CATEGORIES,
  DEFAULT_CURRENCY_SETTINGS,
  DEFAULT_QUICK_AMOUNTS,
} from "@/constants";
import { settingsService } from "@/services/settings";
import { Category, CurrencySettings, QuickAmount, Settings } from "@/types";
import { create } from "zustand";

interface SettingsStore {
  settings: Settings;
  loadSettings: () => Promise<void>;
  updateQuickAmounts: (newAmounts: QuickAmount[]) => Promise<void>;
  updateCurrencySettings: (newSettings: CurrencySettings) => Promise<void>;
  updateCategories: (newCategories: Category[]) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>()((set) => ({
  settings: {
    quickAmounts: DEFAULT_QUICK_AMOUNTS,
    currencySettings: DEFAULT_CURRENCY_SETTINGS,
    categories: DEFAULT_CATEGORIES,
  },
  loadSettings: async () => {},
  updateQuickAmounts: async (newAmounts) => {
    // const res = await settingsService.updateQuickAmountSettings(newAmounts);
    set((state) => ({
      settings: { ...state.settings, quickAmounts: newAmounts },
    }));
  },
  updateCurrencySettings: async (newSettings) => {
    // const res = await settingsService.updateCurrencySettings(newSettings);
    set((state) => ({
      settings: { ...state.settings, currencySettings: newSettings },
    }));
  },
  updateCategories: async (newCategories) => {
    // const res = await settingsService.updateCategorySettings(newCategories);
    set((state) => ({
      settings: { ...state.settings, categories: newCategories },
    }));
  },
}));
