import { z } from "zod";

const quickAmountSchema = z.object({
  amount: z.number().positive(),
  enabled: z.boolean(),
});

const categorySchema = z.object({
  category: z.string().min(1),
  emoji: z.string().min(1),
  enabled: z.boolean(),
});

export const currencySettingsSchema = z.object({
  currencySymbol: z.string().min(1),
  currencyCode: z.string().length(3),
  symbolPosition: z.enum(["before", "after"]),
});

export const themeSchema = z.enum(["dark", "light"]);

export const settingsSchema = z.object({
  currencySettings: currencySettingsSchema.optional(),
  quickAmountSettings: z.array(quickAmountSchema).optional(),
  categorySettings: z.array(categorySchema).optional(),
});

export const quickAmountSettingsSchema = z.array(quickAmountSchema);
export const categorySettinsSchema = z.array(categorySchema);
