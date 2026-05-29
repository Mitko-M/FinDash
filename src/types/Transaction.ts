import { Ionicons } from "@expo/vector-icons";

export type TransactionType = {
  iconName: keyof typeof Ionicons.glyphMap;
  type: "Expense" | "Income";
  category: string;
  amount: number;
  description: string;
  date: Date;
  color?: string;
};
