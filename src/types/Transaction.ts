import { Ionicons } from "@expo/vector-icons";

//UI displaying transaction
export type TransactionType = {
  id: string;
  iconName: keyof typeof Ionicons.glyphMap;
  type: "Expense" | "Income";
  category: string;
  amount: number;
  description: string;
  date: Date; // real JS Date for UI
  color?: string; // optional UI color
};

//DB saved transaction type
export type TransactionDb = {
  id: string;
  type: string;
  category: string;
  amount: number;
  description: string;
  date: string; // ISO string for SQLite
};
