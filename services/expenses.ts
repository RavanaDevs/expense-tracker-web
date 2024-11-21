import { api } from "./api";
import { Expense } from "@/types";

export const expenseService = {
  async getAllExpenses() {
    const response = await fetch("/api/expenses/all", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  },

  async getExpensesByDate(date: Date) {
    const param = `?startDate=${date.toISOString()}`;
    const response = await fetch("/api/expenses/filter" + param, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  },

  async getExpensesByDateRange(startDate: Date, endDate: Date) {
    const param = `?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    const response = await fetch("/api/expenses/filter" + param, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    return response;
  },

  async createExpense(expense: Expense) {
    const response = await fetch("/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    return response;
  },

  async updateExpense(id: string, expense: Expense) {
    const params = `?id=${id}`;
    const response = await fetch("/api/expenses" + params, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expense),
    });
    return response;
  },
};
