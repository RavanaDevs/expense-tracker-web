import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CurrencySettings } from '@/types';
import { DEFAULT_CURRENCY_SETTINGS } from '@/constants/index';

interface CurrencyStore {
  settings: CurrencySettings;
  updateSettings: (settings: Partial<CurrencySettings>) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      settings: DEFAULT_CURRENCY_SETTINGS,
      updateSettings: (newSettings) => set((state) => ({
        settings: { ...state.settings, ...newSettings },
      })),
    }),
    {
      name: 'currency-store',
    }
  )
); 