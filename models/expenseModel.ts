import { Schema, model, Document, models } from "mongoose";

interface IExpense extends Document {
  amount: number;
  category: string;
  description?: string | null;
  date: Date;
  user: string;
}

const expenseSchema = new Schema<IExpense>(
  {
    amount: { type: Number, required: true },
    category: { type: String, required: true },
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
