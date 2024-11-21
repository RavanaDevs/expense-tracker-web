import { useCurrencyStore } from "@/store/currencyStore";
import { useSettingsStore } from "@/store/useSettingsStore";

export const formatCurrency = (amount: number): string => {
  const currencySettings = useSettingsStore(
    (state) => state.settings.currencySettings
  );
  const formattedAmount = amount ? amount.toFixed(2) : 0;
  return currencySettings.position === "before"
    ? `${currencySettings.symbol}${formattedAmount}`
    : `${formattedAmount}${currencySettings.symbol}`;
};
