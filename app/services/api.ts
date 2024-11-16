import { Expense, DateRange, UserSettings, User } from '@/app/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export class APIError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new APIError(response.status, await response.text());
  }
  return response.json();
}

export const expenseService = {
  async create(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const response = await fetch(`${API_BASE_URL}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    return handleResponse<Expense>(response);
  },

  async update(id: string, expense: Partial<Expense>): Promise<Expense> {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    return handleResponse<Expense>(response);
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
      method: 'DELETE',
    });
    return handleResponse<void>(response);
  },

  async getByDateRange(dateRange: DateRange): Promise<Expense[]> {
    const params = new URLSearchParams({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
    });
    const response = await fetch(`${API_BASE_URL}/expenses?${params}`);
    return handleResponse<Expense[]>(response);
  },
};

export const settingsService = {
  async getUserSettings(): Promise<UserSettings> {
    const response = await fetch(`${API_BASE_URL}/settings`);
    return handleResponse<UserSettings>(response);
  },

  async updateUserSettings(settings: Partial<UserSettings>): Promise<UserSettings> {
    const response = await fetch(`${API_BASE_URL}/settings`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    return handleResponse<UserSettings>(response);
  },
};

export const userService = {
  async getCurrentUser(): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user`);
    return handleResponse<User>(response);
  },

  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse<User>(response);
  },
}; 