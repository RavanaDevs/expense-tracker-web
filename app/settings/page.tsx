"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import CurrencySettingsDialog from "@/components/settings/CurrencySettingsDialog";
import QuickAmountSettings from "@/components/settings/QuickAmountSettings";
import CategorySettings from "@/components/settings/CategorySettings";
import { useSettingsStore } from "@/store/useSettingsStore";

export default function SettingsPage() {
  const [isCurrencyDialogOpen, setIsCurrencyDialogOpen] = useState(false);
  const [isQuickAmountDialogOpen, setIsQuickAmountDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setCategoryDialogOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { settings, loadSettings } = useSettingsStore();

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-white">
          Settings
        </h2>

        <div className="space-y-4">
          {/* Currency Settings */}
          <div
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
            onClick={() => setIsCurrencyDialogOpen(true)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  Currency Settings
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Current: {settings.currencySettings.symbol} (
                  {settings.currencySettings.code}) -{" "}
                  {settings.currencySettings.position === "before"
                    ? "Before amount"
                    : "After amount"}
                </p>
              </div>
              <span className="text-slate-400 dark:text-slate-500">→</span>
            </div>
          </div>

          {/* Quick Amount Settings */}
          <div
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
            onClick={() => setIsQuickAmountDialogOpen(true)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  Quick Amount Settings
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Customize quick add amounts (
                  {settings.quickAmounts?.filter(
                    (a: { enabled: boolean }) => a.enabled
                  ).length || 0}{" "}
                  enabled)
                </p>
              </div>
              <span className="text-slate-400 dark:text-slate-500">→</span>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  Theme Settings
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Choose between light and dark theme
                </p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 px-3 py-2 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                <span className="text-lg">
                  {theme === "light" ? "🌞" : "🌙"}
                </span>
                <span className="text-sm font-medium">
                  {theme === "light" ? "Light" : "Dark"}
                </span>
              </button>
            </div>
          </div>

          {/* Category Settings */}
          <div
            className="p-4 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors cursor-pointer"
            onClick={() => setCategoryDialogOpen(true)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  Category Settings
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Customize expense categories ( enabled)
                  {/* {settings.categories?.filter((c: { enabled: boolean }) => c.enabled).length || 0} */}
                </p>
              </div>
              <span className="text-slate-400 dark:text-slate-500">→</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <CurrencySettingsDialog
        isOpen={isCurrencyDialogOpen}
        onClose={() => setIsCurrencyDialogOpen(false)}
      />

      {isQuickAmountDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50"
              onClick={() => setIsQuickAmountDialogOpen(false)}
            />
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                Quick Amount Settings
              </h3>
              <QuickAmountSettings
                isOpen={isQuickAmountDialogOpen}
                onClose={() => setIsQuickAmountDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {isCategoryDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div
              className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50"
              onClick={() => setCategoryDialogOpen(false)}
            />
            <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                Category Settings
              </h3>
              <CategorySettings
                isOpen={isCategoryDialogOpen}
                onClose={() => setCategoryDialogOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
