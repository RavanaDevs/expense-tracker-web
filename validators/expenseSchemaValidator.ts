import { z } from "zod";

export const expenseSchema = z.object({
  amount: z.number().positive("Amount must be positive"),
  category: z.object({
    category: z.string(),
    emoji: z.string(),
    enabled: z.boolean(),
  }),
  description: z.string().optional(),
  date: z.string().datetime({ message: "Invalid ISO date format" }),
});

export const bulkExpenseSchema = z
  .array(expenseSchema)
  .min(1, "At least one expense is required")
  .max(100, "Maximum 100 expenses allowed per request");

export type ExpenseInput = z.infer<typeof expenseSchema>;
export type BulkExpenseInput = z.infer<typeof bulkExpenseSchema>;
