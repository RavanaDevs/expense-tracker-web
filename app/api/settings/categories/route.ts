import connectToDatabase from "@/lib/database";
import Settings from "@/models/settingsModel";
import { categorySettinsSchema } from "@/validators/settingsSchemaValidator";
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
  const settings = await Settings.findOne({ user: userId });
  return NextResponse.json(settings?.categorySettings || []);
});

export const PUT = withErrorHandler(async (req: NextRequest) => {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const validationData = categorySettinsSchema.parse(await req.json());
  const settings = await Settings.findOneAndUpdate(
    { user: userId },
    { categorySettings: validationData },
    { new: true, upsert: true }
  );
  return NextResponse.json(settings.categorySettings);
});
