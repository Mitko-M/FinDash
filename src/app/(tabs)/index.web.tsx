import "./home.web.css";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function HomeWeb() {
  return (
    <div className="page">
      <h1 className="title">Finance Tracker</h1>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="card">Total Balance</div>
        <div className="card">Total Income</div>
        <div className="card">Total Expenses</div>
        <div className="card">Savings Rate</div>
      </div>

      {/* Charts */}
      <div className="chart">Income vs Expenses Chart</div>
      <div className="chart">Category Pie Chart</div>

      {/* Recent Transactions */}
      <h2 className="section-title">Recent Transactions</h2>
      <div className="transaction">Transaction Item</div>

      {/* Floating Action Button */}
      <button className="fab" onClick={() => router.push("/add-transaction")}>
        <Ionicons name="add" size={28} color="white" />
      </button>
    </div>
  );
}
