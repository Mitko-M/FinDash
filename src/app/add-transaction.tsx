import { View, Text, StyleSheet, Pressable } from "react-native";
import { DropdownInputField } from "../components/ui/DropdownInputField";
import { InputField } from "../components/ui/InputField";
import { useState } from "react";
import DateInputField from "../components/ui/DateInputField";

const categoryData = [
  { label: "Food & Dining", value: "1" },
  { label: "Transport", value: "2" },
  { label: "Shopping", value: "3" },
  { label: "Bills & Utilities", value: "4" },
  { label: "Entertainment", value: "5" },
  { label: "HealthCare", value: "6" },
  { label: "Education", value: "7" },
  { label: "Other Expense", value: "8" },
];

const transactionType = [
  { label: "Expense", value: "1" },
  { label: "Income", value: "2" },
];

export default function AddTransactionScreen() {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Transaction</Text>

      <DropdownInputField
        data={transactionType}
        defaultValue="Expense/Income"
        label="Type"
        search={false}
      />
      <DropdownInputField
        data={categoryData}
        defaultValue="Select a category"
        label="Category"
      />
      <InputField placeHolder="0.00" label="Amount" />
      <InputField label="Description" placeHolder="Enter description" />
      <DateInputField value={date} label="Date" onChange={setDate} />

      <Pressable
        style={styles.button}
        onPress={() => console.log("Transaction added")}
      >
        <Text style={styles.buttonText}>Add Transaction</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  button: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "600" },
});
