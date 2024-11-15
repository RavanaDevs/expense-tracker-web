import { CURRENCY } from '@/app/constants';

export const formatCurrency = (amount: number): string => {
  const formattedAmount = amount.toFixed(2);
  return CURRENCY.position === 'before' 
    ? `${CURRENCY.symbol} ${formattedAmount}`
    : `${formattedAmount}${CURRENCY.code}`;
}; 