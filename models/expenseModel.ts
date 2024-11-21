import { Category } from "@/types";
import { Schema, model, Document, models } from "mongoose";
import { boolean } from "zod";

interface IExpense extends Document {
  amount: number;
  category: any;
  description?: string | null;
  date: Date;
  user: string;
}

const expenseSchema = new Schema<IExpense>(
  {
    amount: { type: Number, required: true },
    category: {
      type: Schema.Types.Mixed,
      required: true,
    },
    description: { type: String },
    date: { type: Date, required: true },
    user: { type: String, required: true },
  },
  { timestamps: true }
);

// Create indexes for common queries
expenseSchema.index({ user: 1, date: -1 });
expenseSchema.index({ category: 1 });

const Expense = models?.Expense || model<IExpense>("Expense", expenseSchema);

export default Expense;
