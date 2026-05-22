import { View } from "react-native";
import { TransactionItem } from "./TransactionItem";
import { TransactionType } from "@/src/types/Transaction";

type TransactionListProps = {
  transactionItems: TransactionType[];
};

export function TransactionList({
  transactionItems = [
    {
      iconName: "fitness",
      type: "Expense",
      category: "HealthCare",
      amount: 50,
      description: "Pharmacy",
      date: new Date(),
    },
  ],
}: TransactionListProps) {
  return (
    <View>
      {transactionItems.map((item, i) => (
        <TransactionItem key={i} item={item} />
      ))}
    </View>
  );
}
