import { useCurrencyStore } from "@/store/currencyStore";

export const formatCurrency = (amount: number): string => {
  const { settings } = useCurrencyStore.getState();
  const formattedAmount = amount ? amount.toFixed(2) : 0;
  return settings.position === "before"
    ? `${settings.symbol}${formattedAmount}`
    : `${formattedAmount}${settings.symbol}`;
};
