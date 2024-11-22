import connectToDatabase from "@/lib/database";
import Settings, { ISettings } from "@/models/settingsModel";

export const getOrCreate = async (userId: string): Promise<ISettings> => {
  await connectToDatabase();
  const settings = await Settings.findOne({ user: userId });
  if (settings) return settings;

  const newSettings = new Settings({ user: userId });
  return await newSettings.save();
};
