import { QuickAmount, CurrencySettings, Category } from "@/types";

export const settingsService = {
  async getQuickAmountSettings() {
    const response = await fetch("/api/settings/quick-amounts", {
      method: "GET",
    });
    return response;
  },

  async updateQuickAmountSettings(newQuickAmounts: QuickAmount[]) {
    const response = await fetch("/api/settings/quick-amounts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuickAmounts),
    });
    return response;
  },

  async getCurrencySettings() {
    const response = await fetch("/api/settings/currency", {
      method: "GET",
    });
    return response;
  },

  async updateCurrencySettings(newCurrencySettings: CurrencySettings) {
    const response = await fetch("/api/settings/currency", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCurrencySettings),
    });
    return response;
  },

  async getCategorySettings() {
    const response = await fetch("/api/settings/categories", {
      method: "GET",
    });
    return response;
  },

  async updateCategorySettings(newCategories: Category[]) {
    const response = await fetch("/api/settings/categories", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategories),
    });
    return response;
  },

  async getAllSettings() {
    const response = await fetch("/api/settings", {
      method: "GET",
    });
    return response;
  },
};
