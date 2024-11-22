import connectToDatabase from "@/lib/database";
import { quickAmountSettingsSchema } from "@/validators/settingsSchemaValidator";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { getOrCreate } from "../util";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await getOrCreate(userId);
    return NextResponse.json(settings.quickAmountSettings);
  } catch (err) {
    console.log("Error while updating settings. -> ", err);
    return NextResponse.json({ message: "Error" });
  }
}

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const validationData = quickAmountSettingsSchema.parse(await req.json());
    if (!validationData)
      return NextResponse.json(
        { message: "Error in request body" },
        { status: 400 }
      );

    const settings = await getOrCreate(userId);

    if (validationData.length >= 1) {
      settings.quickAmountSettings = validationData;
      const updated = await settings.save();
      return NextResponse.json(updated, { status: 200 });
    }

    return NextResponse.json({ message: "No elements to update" });
  } catch (err) {
    console.log("Error while updating settings. -> ", err);
    return NextResponse.json({ message: "Error" });
  }
}
