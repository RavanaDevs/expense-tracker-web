import connectToDatabase from "@/lib/database";
import Settings, { ISettings } from "@/models/settingsModel";
import { settingsSchema } from "@/validators/settingsSchemaValidator";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const settings = await Settings.findOne({ user: userId });
    return NextResponse.json(settings);
  } catch (err) {
    console.log("Error while retrieving currency settings. -> ", err);
    return NextResponse.json({ message: "Error" });
  }
}
