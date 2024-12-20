"use client";

import { useState } from "react";
import { DATE_FORMAT } from "@/constants/index";
import { DEFAULT_CATEGORIES } from "@/constants/index";
import { useSettingsStore } from "@/store/useSettingsStore";
import { Category } from "@/types";

interface CategorySettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CategorySettings({
  isOpen,
  onClose,
}: CategorySettingsProps) {
  const categorySettings = useSettingsStore(
    (state) => state.settings.categories
  );
  const updateCategories = useSettingsStore((state) => state.updateCategories);
  const [categories, setCategories] = useState<Category[]>(categorySettings);
  const [newCategory, setNewCategory] = useState({
    label: "",
    emoji: "📌",
  });

  const handleToggle = (name: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.category === name
          ? { ...category, enabled: !category.enabled }
          : category
      )
    );
  };

  const handleAdd = () => {
    if (newCategory.label.trim()) {
      setCategories((prev) => [
        ...prev,
        {
          category: newCategory.label,
          emoji: newCategory.emoji,
          enabled: true,
        },
      ]);

      setNewCategory({ label: "", emoji: "📌" });
    }
  };

  const handleRemove = (name: string) => {
    // Prevent removing if it's the last enabled category
    const enabledCount = categories.filter((c) => c.enabled).length;
    const category = categories.find((c) => c.category === name);

    if (enabledCount === 1 && category?.enabled) {
      alert("You must have at least one enabled category");
      return;
    }

    setCategories((prev) =>
      prev.filter((category) => category.category !== name)
    );
  };

  const handleSave = () => {
    updateCategories(categories);
    onClose();
  };

  const EMOJI_OPTIONS = [
    "📌",
    "🍽️",
    "🚗",
    "🎮",
    "📱",
    "🛍️",
    "🏥",
    "📚",
    "🏠",
    "💼",
    "✈️",
    "🎨",
    "🎵",
    "🎬",
    "📖",
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {/* Add new category */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={newCategory.label}
              onChange={(e) =>
                setNewCategory({ ...newCategory, label: e.target.value })
              }
              placeholder="Enter category name"
              className="w-full px-4 py-2.5 rounded-md border-0 text-slate-900 dark:text-white bg-white dark:bg-slate-700 ring-1 ring-inset ring-slate-200 dark:ring-slate-600 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-inset focus:ring-slate-800 dark:focus:ring-slate-400"
            />
          </div>
          <select
            value={newCategory.emoji}
            onChange={(e) =>
              setNewCategory({ ...newCategory, emoji: e.target.value })
            }
            className="px-3 py-2.5 rounded-md border-0 text-slate-900 dark:text-white bg-white dark:bg-slate-700 ring-1 ring-inset ring-slate-200 dark:ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-slate-800 dark:focus:ring-slate-400"
          >
            {EMOJI_OPTIONS.map((emoji) => (
              <option key={emoji} value={emoji}>
                {emoji}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2.5 rounded-md bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
          >
            Add
          </button>
        </div>

        {/* Categories list */}
        <div className="space-y-2">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-md bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600"
            >
              <div className="flex items-center space-x-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={category.enabled}
                    onChange={() => handleToggle(category.category)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-slate-300 dark:peer-focus:ring-slate-800 rounded-full peer dark:bg-slate-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-slate-800 dark:peer-checked:bg-slate-700"></div>
                </label>
                <span className="text-xl">{category.emoji}</span>
                <span className="text-slate-900 dark:text-white font-medium">
                  {category.category}
                </span>
              </div>
              <button
                onClick={() => handleRemove(category.category)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="px-3 py-2 rounded-md bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
