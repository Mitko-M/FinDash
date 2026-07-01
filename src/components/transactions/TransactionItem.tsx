import { TransactionType } from "@/src/types/Transaction";
import { View, Text, Pressable } from "react-native";
import { formatDate } from "@/src/utils/formatDate";
import { Ionicons } from "@expo/vector-icons";

type TransactionItemProps = {
  item: TransactionType;
};

export function TransactionItem({ item }: TransactionItemProps) {
  const formattedText = `${item.category} \u2B24 ${formatDate(item.date)}`;
  const isNegative = item.type === "Expense";

  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? "#F0F1F3" : "#F9FAFB",
        marginBottom: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        padding: 12,
        borderRadius: 8,
      })}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name={item.iconName} size={24} color={item.color} />
        </View>

        <View style={{ flexDirection: "column" }}>
          <Text style={{ color: "#111", fontWeight: "600", fontSize: 16 }}>
            {item.description}
          </Text>
          <Text style={{ color: "#666", fontSize: 12 }}>{formattedText}</Text>
        </View>
      </View>

      <Text
        style={{
          color: isNegative ? "#D32F2F" : "#2E7D32",
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        {(isNegative ? "-" : "+") + "$" + item.amount}
      </Text>
    </Pressable>
  );
}
