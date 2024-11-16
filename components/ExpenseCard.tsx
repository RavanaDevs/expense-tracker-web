import { Expense } from "@/types";
import { CATEGORY_EMOJIS } from "@/constants/index";
import { formatDate } from "@/utils/date";
import { formatCurrency } from "@/utils/currency";

interface ExpenseCardProps {
  expense: Expense;
  onClick: (expense: Expense) => void;
}

export default function ExpenseCard({ expense, onClick }: ExpenseCardProps) {
  return (
    <div
      className="flex justify-between items-center p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors bg-white dark:bg-slate-800 cursor-pointer"
      onClick={() => onClick(expense)}
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{CATEGORY_EMOJIS[expense.category]}</span>
        <div>
          <p className="text-sm text-slate-700 dark:text-slate-300 capitalize">{expense.category}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{formatDate(expense.date)}</p>
        </div>
      </div>
      <span className="font-medium text-slate-900 dark:text-white">{formatCurrency(expense.amount)}</span>
    </div>
  );
} 