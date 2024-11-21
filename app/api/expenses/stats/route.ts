import connectToDatabase from "@/lib/database";
import Expense from "@/models/expenseModel";
import { ExpenseStats } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

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
          highest: null,
          topCategory: null,
        },
        { status: 200 }
      );
    }

    // Calculate total
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate average
    const average = total / expenses.length;

    // Find highest expense category
    const highest = expenses.reduce(
      (max, expense) => {
        return expense.amount > max.amount
          ? { category: expense.category, amount: expense.amount }
          : max;
      },
      { category: "", amount: 0 }
    );

    // Calculate category frequencies
    const categoryFrequency = expenses.reduce(
      (freq: { [key: string]: number }, expense) => {
        freq[expense.category] = (freq[expense.category] || 0) + 1;
        return freq;
      },
      {}
    );

    // Find most frequent category
    const topCategory = Object.entries(categoryFrequency).reduce(
      (max, [category, count]) => {
        return count > max.count ? { category, count } : max;
      },
      { category: "", count: 0 }
    );

    const stats: ExpenseStats = {
      total,
      average,
      highest,
      topCategory,
    };

    return NextResponse.json({ stats }, { status: 200 });
  } catch (err) {
    console.log("Error while getting stats -->", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
