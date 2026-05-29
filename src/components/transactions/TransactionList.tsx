import { View } from "react-native";
import { TransactionItem } from "./TransactionItem";
import { TransactionType } from "@/src/types/Transaction";

type TransactionListProps = {
  transactionItems: TransactionType[];
};

export function TransactionList({ transactionItems }: TransactionListProps) {
  return (
    <View>
      {transactionItems.map((item, i) => (
        <TransactionItem key={i} item={item} />
      ))}
    </View>
  );
}
