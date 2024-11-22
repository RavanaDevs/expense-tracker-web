import connectToDatabase from "@/lib/database";
import Expense from "@/models/expenseModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/utils/errorHandler";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const startDate = req.nextUrl.searchParams.get("startDate");
  const endDate = req.nextUrl.searchParams.get("endDate");
  await connectToDatabase();
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

  const expenses = await Expense.find(query);
  return NextResponse.json(expenses);
});
