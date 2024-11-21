"use client";

import { useState } from "react";
import { useExpenseStore } from "@/store/useExpenseStore";
import { Category, CurrencyPosition, Expense, QuickAmount } from "@/types";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function ExpenseForm() {
  const { addExpense } = useExpenseStore();
  const { settings } = useSettingsStore();

  const [expense, setExpense] = useState<any>({
    amount: "",
  });

  const enabledQuickAmounts =
    settings.quickAmounts
      ?.filter((qa) => qa.enabled)
      .map((qa) => qa.amount)
      .sort((a, b) => a - b) || [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expense.amount) return;
    const expenseToAdd: Expense = {
      ...expense,
      amount: Number(expense.amount),
      date: new Date(),
    };
    console.log(expenseToAdd);
    addExpense(expenseToAdd);
    setExpense({ amount: "" });
  };

  const handleQuickAdd = (amount: number) => {
    const currentAmount =
      expense.amount === "" ? 0 : parseFloat(expense.amount);
    setExpense({
      ...expense,
      amount: (currentAmount + amount).toString(),
    });
  };

  const renderCurrencySymbol = (position: CurrencyPosition) => {
    if (settings.currencySettings.position !== position) return null;

    return (
      <div
        className={`pointer-events-none absolute inset-y-0 ${
          position === "before" ? "left-0 pl-3" : "right-0 pr-3"
        } flex items-center`}
      >
        <span className="text-slate-600 dark:text-slate-400 sm:text-sm">
          {settings.currencySettings.symbol}
        </span>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="relative mt-2 rounded-md shadow-sm">
          {renderCurrencySymbol("before")}
          <input
            type="number"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            placeholder="0.00"
            className={`block w-full px-4 py-3 rounded-md border-0 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-200 dark:ring-slate-700 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 dark:focus:ring-slate-400 text-lg bg-white dark:bg-slate-700
              ${
                settings.currencySettings.position === "before"
                  ? "pl-7"
                  : "pr-7"
              }`}
            required
          />
          {renderCurrencySymbol("after")}
        </div>

        {/* Quick Add Buttons */}
        {enabledQuickAmounts.length > 0 && (
          <div className="mt-3 grid grid-cols-3 sm:flex sm:justify-end gap-2">
            {enabledQuickAmounts.map((amount: number) => (
              <button
                key={amount}
                type="button"
                onClick={() => handleQuickAdd(amount)}
                className="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors ring-1 ring-slate-200 dark:ring-slate-600"
              >
                +{amount}
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <select
          onChange={(e) =>
            setExpense({
              ...expense,
              category: settings.categories[Number(e.target.value)],
            })
          }
          className="block w-full px-4 py-3 rounded-md border-0 text-slate-900 dark:text-white ring-1 ring-inset ring-slate-200 dark:ring-slate-700 focus:ring-2 focus:ring-inset focus:ring-slate-800 dark:focus:ring-slate-400 bg-white dark:bg-slate-700"
        >
          <option>---</option>
          {settings.categories.map(
            (category, index) =>
              category.enabled && (
                <option key={index} value={index} className="dark:bg-slate-700">
                  {category.category}
                </option>
              )
          )}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-slate-800 dark:bg-slate-700 text-white py-3 rounded-md text-sm font-medium hover:bg-slate-700 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
      >
        Add Expense
      </button>
    </form>
  );
}
