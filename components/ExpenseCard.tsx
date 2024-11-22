import { Expense } from "@/types";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";
import { useSettingsStore } from "@/store/useSettingsStore";

interface ExpenseCardProps {
  expense: Expense;
  onClick: (expense: Expense) => void;
}

export default function ExpenseCard({ expense, onClick }: ExpenseCardProps) {
  const currencySettings = useSettingsStore(
    (state) => state.settings.currencySettings
  );
  return (
    <div
      className="flex justify-between items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
      onClick={() => onClick(expense)}
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{expense.category.emoji}</span>
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300 capitalize">
            {expense.category.category}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {formatDate(expense.date)}
          </p>
        </div>
      </div>
      <span className="font-medium text-slate-900 dark:text-white">
        {formatCurrency(expense.amount)}
      </span>
    </div>
  );
}
