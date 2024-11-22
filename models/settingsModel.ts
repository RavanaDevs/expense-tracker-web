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

// interface QuickAmount {
//   id: string;
//   amount: number;
//   enabled: boolean;
// }

// interface Category {
//   id: string;
//   value: string;
//   label: string;
//   emoji: string;
//   enabled: boolean;
// }

// interface CurrencySettings {
//   currencySymbol: string;
//   currencyCode: string;
//   symbolPosition: "before" | "after";
// }

// interface QuickAmountSettings {
//   quickAmounts: QuickAmount[];
// }

// interface CategorySettings {
//   categories: Category[];
// }

// interface ISettings extends Document {
//   user: Schema.Types.ObjectId;
//   currencySettings: CurrencySettings;
//   quickAmountSettings: QuickAmountSettings;
//   categorySettings: CategorySettings;
//   theme: "dark" | "light";
// }

// const settingsSchema = new Schema<ISettings>({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "user",
//     required: true,
//     unique: true,
//   },
//   currencySettings: {
//     currencySymbol: { type: String, default: "$" },
//     currencyCode: { type: String, default: "USD" },
//     symbolPosition: {
//       type: String,
//       enum: ["before", "after"],
//       default: "before",
//     },
//   },
//   quickAmountSettings: {
//     quickAmounts: [
//       {
//         id: { type: String, required: true },
//         amount: { type: Number, required: true },
//         enabled: { type: Boolean, default: true },
//       },
//     ],
//   },
//   categorySettings: {
//     categories: [
//       {
//         id: { type: String, required: true },
//         value: { type: String, required: true },
//         label: { type: String, required: true },
//         emoji: { type: String, required: true },
//         enabled: { type: Boolean, default: true },
//       },
//     ],
//   },
//   theme: { type: String, enum: ["dark", "light"], default: "light" },
// });

// const Settings =
//   models.settings || model<ISettings>("settings", settingsSchema);

// export default Settings;
// export type {
//   ISettings,
//   CurrencySettings,
//   QuickAmountSettings,
//   CategorySettings,
//   QuickAmount,
//   Category,
// };
