import connectToDatabase from "@/lib/database";
import Settings from "@/models/settingsModel";
import { currencySettingsSchema } from "@/validators/settingsSchemaValidator";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const settings = await Settings.findOne({ user: userId });
    return NextResponse.json(settings?.currencySettings || {});
  } catch (err) {
    console.log("Error while retrieving currency settings. -> ", err);
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
    const validationData = currencySettingsSchema.parse(await req.json());
    const settings = await Settings.findOneAndUpdate(
      { user: userId },
      { currencySettings: validationData },
      { new: true, upsert: true }
    );
    return NextResponse.json(settings.currencySettings);
  } catch (err) {
    console.log("Error while updating currency settings. -> ", err);
    return NextResponse.json({ message: "Error" });
  }
}