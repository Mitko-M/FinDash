import { CategoryType } from "@/src/types/Category";
import { Ionicons } from "@expo/vector-icons";

export const Categories: Record<
  CategoryType,
  { label: string; icon: keyof typeof Ionicons.glyphMap; color: string }
> = {
  Food: { label: "Food & Dining", icon: "fast-food", color: "#FF7043" },
  Transport: { label: "Transport", icon: "car", color: "#42A5F5" },
  Shopping: { label: "Shopping", icon: "cart", color: "#AB47BC" },
  Bills: { label: "Bills & Utilities", icon: "flash", color: "#FFA726" },
  Entertainment: {
    label: "Entertainment",
    icon: "game-controller",
    color: "#26C6DA",
  },
  HealthCare: { label: "HealthCare", icon: "fitness", color: "#EF5350" },
  Education: { label: "Education", icon: "school", color: "#66BB6A" },
  Other: {
    label: "Other Expense",
    icon: "ellipsis-horizontal",
    color: "#BDBDBD",
  },
  Income: { label: "Income", icon: "cash", color: "#90EE90" },
};
