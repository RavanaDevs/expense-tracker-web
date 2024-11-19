import { api } from "./api";
import { Expense } from "@/types";

export const expenseService = {
  async getByDate(date: string) {
    console.log(date);
    const response = await api.get<Expense[]>(`/expenses/date/${date}`);
    console.log(response);
    return response.data;
  },

  async updateExpense(id: string, expense: Expense) {
    const response = await api.put<Expense>(`/expenses/${id}`, expense);
    return response.data;
  },

  async createExpense(expense: Expense) {
    const response = await api.post<Expense>("/expenses", expense);
    console.log(response);
    return response.data;
  },
};
