import {
  DEFAULT_CATEGORIES,
  DEFAULT_CURRENCY_SETTINGS,
  DEFAULT_QUICK_AMOUNTS,
} from "@/constants";
import { settingsService } from "@/services/settings";
import { Category, CurrencySettings, QuickAmount, Settings } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsStore {
  settings: Settings;
  loadSettings: () => Promise<void>;
  updateQuickAmounts: (newAmounts: QuickAmount[]) => Promise<void>;
  updateCurrencySettings: (newSettings: CurrencySettings) => Promise<void>;
  updateCategories: (newCategories: Category[]) => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: {
        quickAmounts: DEFAULT_QUICK_AMOUNTS,
        currencySettings: DEFAULT_CURRENCY_SETTINGS,
        categories: DEFAULT_CATEGORIES,
      },
      loadSettings: async () => {
        try {
          const res = await settingsService.getAllSettings();
          const data = await res.json();
          set((state) => ({
            settings: {
              quickAmounts: data.quickAmounts || DEFAULT_QUICK_AMOUNTS,
              currencySettings: data.currencySettings || DEFAULT_CURRENCY_SETTINGS,
              categories: data.categories || DEFAULT_CATEGORIES,
            },
          }));
        } catch (error) {
          console.error("Error loading settings:", error);
        }
      },
      updateQuickAmounts: async (newAmounts) => {
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
    }),
    {
      name: "settings-storage", // unique name for local storage key
    }
  )
);
