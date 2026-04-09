import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Finance Tracker</Text>

        {/* Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={styles.card}>
            <Text>Total Balance</Text>
          </View>
          <View style={styles.card}>
            <Text>Total Income</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.card}>
            <Text>Total Expenses</Text>
          </View>
          <View style={styles.card}>
            <Text>Savings Rate</Text>
          </View>
        </View>

        {/* Charts */}
        <View style={styles.chartPlaceholder}>
          <Text>Income vs Expenses Chart</Text>
        </View>

        <View style={styles.chartPlaceholder}>
          <Text>Category Pie Chart</Text>
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
  card: {
    flex: 1,
    height: 100,
    backgroundColor: "#eee",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: "#ddd",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
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
