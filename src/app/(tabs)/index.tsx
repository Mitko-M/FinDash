import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { Card } from "@/src/components/ui/Card";
import { IncomeExpenseChart } from "@/src/components/charts/IncomeExpenseChart";
import { CategoryPieChart } from "@/src/components/charts/CategoryPieChart";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  //? MARK: Later this needs to be user inputted
  //------------------------------
  const totalIncome = 5975;
  const totalExpenses = 670.5;
  //------------------------------

  const totalBalance = totalIncome - totalExpenses;
  const savingsRate = totalBalance / (totalIncome / 100);

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
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        <View style={styles.transactionPlaceholder}>
          <Text>Transaction Item</Text>
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
  container: { padding: 16 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  summaryRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
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
  sectionTitle: { fontSize: 20, fontWeight: "600", marginBottom: 8 },
  transactionPlaceholder: {
    height: 60,
    backgroundColor: "#eee",
    borderRadius: 12,
    justifyContent: "center",
    paddingHorizontal: 16,
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
