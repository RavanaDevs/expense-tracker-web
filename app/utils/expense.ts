import { Expense, DateRange, ExpenseCategory } from "@/app/types";

export const filterExpensesByDateRange = (expenses: Expense[], dateRange: DateRange) => {
  return expenses.filter(expense => 
    expense.date >= dateRange.startDate && expense.date <= dateRange.endDate
  );
};

export const calculateExpenseStats = (expenses: Expense[]) => {
  if (expenses.length === 0) {
    return {
      total: 0,
      average: 0,
      mostExpensive: 'None',
      topCategory: 'None'
    };
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const average = total / expenses.length;
  
  const mostExpensive = expenses.reduce((max, expense) => 
    expense.amount > max.amount ? expense : max
  ).category;

  const categoryCount = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + 1;
    return acc;
  }, {} as Record<ExpenseCategory, number>);

  const topCategory = Object.entries(categoryCount).reduce((max, current) => 
    current[1] > (max[1] || 0) ? current : max
  )[0];

  return {
    total,
    average,
    mostExpensive,
    topCategory
  };
}; 