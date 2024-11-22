import connectToDatabase from "@/lib/database";
import Expense from "@/models/expenseModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/utils/errorHandler";

export const dynamic = "force-dynamic";

export const GET = withErrorHandler(async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const expenses = await Expense.find({ user: userId });
  return NextResponse.json(expenses);
});
