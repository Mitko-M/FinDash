import { CategoryType } from "@/src/types/Category";
import { Ionicons } from "@expo/vector-icons";

export const Categories: Record<
  CategoryType,
  {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    color: string;
    gradient: string;
  }
> = {
  Food: {
    label: "Food & Dining",
    icon: "fast-food",
    color: "#FF7043",
    gradient: "#D84315",
  },
  Transport: {
    label: "Transport",
    icon: "car",
    color: "#42A5F5",
    gradient: "#1E88E5",
  },
  Shopping: {
    label: "Shopping",
    icon: "cart",
    color: "#AB47BC",
    gradient: "#8E24AA",
  },
  Bills: {
    label: "Bills & Utilities",
    icon: "flash",
    color: "#FFA726",
    gradient: "#FB8C00",
  },
  Entertainment: {
    label: "Entertainment",
    icon: "game-controller",
    color: "#26C6DA",
    gradient: "#00ACC1",
  },
  HealthCare: {
    label: "HealthCare",
    icon: "fitness",
    color: "#EF5350",
    gradient: "#D32F2F",
  },
  Education: {
    label: "Education",
    icon: "school",
    color: "#66BB6A",
    gradient: "#43A047",
  },
  Other: {
    label: "Other Expense",
    icon: "ellipsis-horizontal",
    color: "#BDBDBD",
    gradient: "#9E9E9E",
  },
  Income: {
    label: "Income",
    icon: "cash",
    color: "#90EE90",
    gradient: "#66BB6A",
  },
};
