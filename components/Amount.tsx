import { useSettingsStore } from "@/store/useSettingsStore";

export default function Amount({ amount }: { amount: number }) {
  const currencySettings = useSettingsStore(
    (state) => state.settings.currencySettings
  );
  const formattedAmount = amount ? amount.toFixed(2) : 0;
  return currencySettings.position === "before"
    ? `${currencySettings.symbol}${formattedAmount}`
    : `${formattedAmount}${currencySettings.symbol}`;
}
