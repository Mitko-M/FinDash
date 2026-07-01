import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Card } from "@/src/components/ui/Card";
import { IncomeExpenseChart } from "@/src/components/charts/IncomeExpenseChart";
import { CategoryPieChart } from "@/src/components/charts/CategoryPieChart";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { TransactionList } from "@/src/components/transactions/TransactionList";
import { TransactionDb, TransactionType } from "@/src/types/Transaction";
import { Categories } from "@/src/services/categories";
import { getAllTransactions } from "@/src/services/transactions";
import { useEffect, useState } from "react";
import { CategoryType } from "@/src/types/Category";

export default function HomeScreen() {
  const [transactionsFromDb, setTransactionFromDb] = useState<TransactionDb[]>(
    [],
  );

  useEffect(() => {
    const getData = async () => {
      const data = await getAllTransactions();
      setTransactionFromDb(data);
    };

    getData();
  }, []);

  //? MARK: Later this needs to be calculated based on transactions
  //------------------------------
  const totalIncome = 5975;
  const totalExpenses = 670.5;
  //------------------------------

  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalBalance / (totalIncome / 100);

  const transactions: TransactionType[] = transactionsFromDb
    .slice(0, 5)
    .map((t) => {
      return {
        id: t.id,
        iconName: Categories[t.category as CategoryType].icon,
        type: t.type as "Expense" | "Income",
        category: t.category,
        amount: t.amount,
        description: t.description,
        date: new Date(t.date),
        color: Categories[t.category as CategoryType].color,
      };
    });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Finance Tracker</Text>

        {/* Summary Cards */}
        <View>
          <Card
            title="Total Balance"
            value={totalBalance}
            description="12.5% from last month"
            cardIconName="wallet-outline"
            cardIconColor="blue"
          />
          <Card
            title="Total Income"
            value={totalIncome}
            description="8.2% from last month"
            cardIconName="trending-up"
            cardIconColor="green"
          />
          <Card
            title="Total Expenses"
            value={totalExpenses}
            description="3.1% from last month"
            cardIconName="trending-down"
            isRateDown
            cardIconColor="red"
          />
          <Card
            title="Savings Rate"
            value={savingsRate}
            savings
            cardIconName="cash-outline"
            cardIconColor="purple"
          />
        </View>

        {/* Charts */}
        <View style={styles.chartContainer}>
          <Text style={{ fontWeight: "bold" }}>Income vs Expenses</Text>
          <IncomeExpenseChart />
        </View>

        <View style={styles.chartContainer}>
          <Text style={{ fontWeight: "bold" }}>Spending by Category</Text>
          <CategoryPieChart />
        </View>

        {/* Recent Transactions */}
        <View style={styles.recentTransactionsContainer}>
          <TransactionList transactionItems={transactions} />
        </View>
      </ScrollView>
      <Pressable
        style={styles.fab}
        onPress={() => router.push("/add-transaction")}
      >
        <Ionicons name="add" size={32} color={"white"} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // This padding bottoms is so the add-transaction button doesn't cover the demo transaction - will be removed later
  container: { padding: 16, paddingBottom: 60 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  recentTransactionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    gap: 4,
    overflowY: "scroll",
  },
  chartContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    overflow: "hidden",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#4CAF50",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
