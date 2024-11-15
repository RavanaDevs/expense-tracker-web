import { Expense } from "@/app/types";
import { CATEGORY_EMOJIS } from "@/app/constants";
import { formatDate } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/currency";

interface ExpenseCardProps {
  expense: Expense;
  onClick: (expense: Expense) => void;
}

export default function ExpenseCard({ expense, onClick }: ExpenseCardProps) {
  return (
    <div
      className="flex justify-between items-center p-4 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors bg-white cursor-pointer"
      onClick={() => onClick(expense)}
    >
      <div className="flex items-center space-x-3">
        <span className="text-xl">{CATEGORY_EMOJIS[expense.category]}</span>
        <div>
          <p className="text-sm text-slate-700 capitalize">{expense.category}</p>
          <p className="text-xs text-slate-500">{formatDate(expense.date)}</p>
        </div>
      </div>
      <span className="font-medium text-slate-900">{formatCurrency(expense.amount)}</span>
    </div>
  );
} 