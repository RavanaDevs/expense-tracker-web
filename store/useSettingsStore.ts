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
  loadSettings: () => void;
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
  loadSettings: async () => {
    const res = await fetch("/api/settings");
    const data = await res.json();
    set((state) => ({
      settings: {
        ...state.settings,
        ...data,
      },
    }));
  },
  updateQuickAmounts: async (newAmounts) => {
    const res = await settingsService.updateQuickAmountSettings(newAmounts);
    console.log(await res.json());
    set((state) => ({
      settings: { ...state.settings, quickAmounts: newAmounts },
    }));
  },
  updateCurrencySettings: async (newSettings) => {
    set((state) => ({
      settings: { ...state.settings, currencySettings: newSettings },
    }));
  },
  updateCategories: async (newCategories) => {
    set((state) => ({
      settings: { ...state.settings, categories: newCategories },
    }));
  },
}));
