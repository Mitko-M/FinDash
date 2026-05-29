import { Ionicons } from "@expo/vector-icons";

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

export type TransactionDb = {
  id: string;
  type: "Expense" | "Income";
  category: string;
  amount: number;
  description: string;
  date: string; // ISO string for SQLite
};
