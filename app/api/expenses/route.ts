import connectToDatabase from "@/lib/database";
import Expense from "@/models/expenseModel";
import { expenseSchema } from "@/validators/expenseSchemaValidator";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  try {
    const validationData = expenseSchema.parse(await req.json());

    const e = new Expense({ ...validationData, user: userId });
    const expense = await e.save();

    return NextResponse.json(
      { message: "Expense Created", expense },
      { status: 201 }
    );
  } catch (err) {
    console.log("Error while adding expense. -> ", err);
    return NextResponse.json({ message: "Error" });
  }
}
