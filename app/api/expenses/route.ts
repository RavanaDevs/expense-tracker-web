import connectToDatabase from "@/lib/database";
import Expense from "@/models/expenseModel";
import { expenseSchema } from "@/validators/expenseSchemaValidator";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { withErrorHandler } from "@/utils/errorHandler";

export const POST = withErrorHandler(async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const validationData = expenseSchema.parse(await req.json());
  const e = new Expense({ ...validationData, user: userId });
  const expense = await e.save();

  return NextResponse.json(
    { message: "Expense Created", expense },
    { status: 201 }
  );
});

export const PUT = withErrorHandler(async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const expenseId = req.nextUrl.searchParams.get("id");
  if (!expenseId) {
    return NextResponse.json({ message: "Invalid id" }, { status: 404 });
  }

  await connectToDatabase();
  const validationData = expenseSchema.parse(await req.json());
  const expense = await Expense.findByIdAndUpdate(expenseId, validationData, {
    new: true,
  });

  return NextResponse.json(
    { message: "Expense Updated", expense },
    { status: 201 }
  );
});
