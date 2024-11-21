import { api } from "./api";
import { Expense } from "@/types";

export const expenseService = {
  async getByDate(date: string) {
    const response = await api.get<Expense[]>(`/expenses/date/${date}`);
    console.log(response);
    return response.data;
  },

  async getByDateRange(startDate: string, endDate: string) {
    const response = await api.get<Expense[]>(`/expenses/all`, {
      params: {
        startDate: startDate,
        endDate: endDate,
      },
    });
    console.log(response);
    return response.data;
  },

  async updateExpense(id: string, expense: Expense) {
    const response = await api.put<Expense>(`/expenses/${id}`, expense);
    return response.data;
  },

  async getAllExpenses() {
    const response = await fetch("/api/expenses/all", {
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
};
