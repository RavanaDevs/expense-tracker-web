import connectToDatabase from "@/lib/database";
import Settings, { ISettings } from "@/models/settingsModel";
import { settingsSchema } from "@/validators/settingsSchemaValidator";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const getOrCreate = async (userId: string): Promise<ISettings> => {
  await connectToDatabase();
  const settings = await Settings.findOne({ user: userId });
  if (settings) return settings;

  const newSettings = new Settings({ user: userId });
  return await newSettings.save();
};

export async function PUT(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectToDatabase();
    const validationData = settingsSchema.parse(await req.json());
    if (!validationData)
      return NextResponse.json(
        { message: "Error in request body" },
        { status: 400 }
      );

    const settings = await getOrCreate(userId);

    if (
      validationData.quickAmountSettings &&
      validationData.quickAmountSettings[0]
    ) {
      settings.quickAmountSettings = validationData.quickAmountSettings;
      const updated = await settings.save();

      console.log(updated);
    }

    return NextResponse.json(settings);
  } catch (err) {
    console.log("Error while updating settings. -> ", err);
    return NextResponse.json({ message: "Error" });
  }
}
