import connectToDatabase from "@/lib/database";
import Expense from "@/models/expenseModel";
import {
  Category,
  Expense as ExpenseType,
  ExpenseStats,
  StatCategory,
} from "@/types";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { number, object } from "zod";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");

  const query: any = { user: userId };

  if (startDate || endDate) {
    query.date = {};
    if (startDate) {
      query.date.$gte = new Date(startDate.split("T")[0]);
    }
    if (endDate) {
      query.date.$lte = new Date(endDate.split("T")[0]);
    }
  }

  await connectToDatabase();

  try {
    // Get all matching expenses
    const expenses = await Expense.find(query);

    if (expenses.length === 0) {
      return NextResponse.json(
        {
          total: 0,
          average: 0,
          highest: { category: null, count: 0 },
          topCategory: { category: null, count: 0 },
        },
        { status: 200 }
      );
    }

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate average
    const average = total / expenses.length;

    type CategoryValue = {
      count: number;
      value: Category | null;
    };

    type CategoryFreequency = Record<string, CategoryValue>;

    console.log(expenses);

    // Find highest expense category
    const highest: CategoryValue = expenses.reduce(
      (max: CategoryValue, expense) => {
        return expense.amount > max.count
          ? { count: expense.amount, value: expense.category }
          : max;
      },
      { value: null, count: 0 }
    );

    //Calculate category freequencies
    const categoryFrequency: CategoryFreequency = expenses.reduce(
      (freq: CategoryFreequency, expense: ExpenseType) => {
        const key = expense.category.category.toString();
        freq[key] = freq[key]
          ? { count: (freq[key].count || 0) + 1, value: expense.category }
          : { count: 1, value: expense.category };
        return freq;
      },
      {}
    );

    //Calculate top category
    const topCategory: CategoryValue = Object.values(categoryFrequency).reduce(
      (max: CategoryValue, record) => {
        return record.count > max.count ? record : max;
      },
      { value: null, count: 0 }
    );

    const stats: ExpenseStats = {
      total,
      average,
      highest: { category: highest.value, count: highest.count },
      topCategory: { category: topCategory.value, count: topCategory.count },
    };

    console.log(stats);

    return NextResponse.json({ stats }, { status: 200 });
  } catch (err) {
    console.log("Error while getting stats -->", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
