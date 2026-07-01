import { View, Text } from "react-native";
import { TransactionItem } from "./TransactionItem";
import { TransactionType } from "@/src/types/Transaction";

type TransactionListProps = {
  transactionItems: TransactionType[];
};

export function TransactionList({ transactionItems }: TransactionListProps) {
  return (
    <View>
      {transactionItems && transactionItems.length > 0 ? (
        transactionItems.map((item, i) => (
          <TransactionItem key={i} item={item} />
        ))
      ) : (
        <Text>No transactions yet!</Text>
      )}
    </View>
  );
}
