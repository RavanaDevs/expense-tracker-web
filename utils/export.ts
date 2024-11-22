import { Expense } from "@/types";
import { formatDate } from "./date";

export const exportToCSV = (expenses: Expense[]) => {
  // Define CSV headers
  const headers = ["Date", "Category", "Amount", "Description"];

  // Convert expenses to CSV rows
  const rows = expenses.map((expense) => [
    formatDate(expense.date),
    expense.category,
    expense.amount.toFixed(2),
    expense.description || "",
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `expenses_${formatDate(new Date())}.csv`);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
