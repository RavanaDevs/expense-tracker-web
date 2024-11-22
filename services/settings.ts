import { QuickAmount } from "@/types";

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
};
