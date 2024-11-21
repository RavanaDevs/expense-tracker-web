import connectToDatabase from "@/lib/database";
import Expense from "@/models/expenseModel";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  try {
    const expenses = await Expense.find({ user: userId });
    console.log(expenses);
    return NextResponse.json(expenses);
  } catch (err) {
    console.log("Error while getting expense. -> ", err);
    return NextResponse.json({ message: "Error" });
  }
}
