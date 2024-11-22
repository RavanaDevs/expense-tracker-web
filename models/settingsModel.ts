import { Category, CurrencySettings, QuickAmount } from "@/types";
import { Schema, model, Document, models } from "mongoose";

interface ISettings extends Document {
  user: string;
  quickAmountSettings?: QuickAmount[];
  categorySettings?: Category[];
  currencySettings?: CurrencySettings;
}

const settingsSchema = new Schema<ISettings>({
  user: { type: String, required: true },
  quickAmountSettings: { type: Schema.Types.Array, required: false },
  categorySettings: { type: Schema.Types.Array, required: false },
  currencySettings: { type: Schema.Types.Mixed, required: false },
});

const Settings =
  models?.settings || model<ISettings>("settings", settingsSchema);

export default Settings;

export type { ISettings };
