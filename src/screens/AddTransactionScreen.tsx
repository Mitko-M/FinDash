import { View, Text, StyleSheet, Pressable } from "react-native";
import { DropdownInputField } from "../components/ui/DropdownInputField";
import { InputField } from "../components/ui/InputField";
import { useState } from "react";
import { Categories } from "../services/categories";
import DateInputField from "../components/ui/DateInputField";

const incomeCategoryData = [{ label: "Income", value: "Income" }];
const expenseCategoryData = Object.entries(Categories).map(([key, cat]) => ({
  label: cat.label,
  value: key,
}));

const transactionType = [
  { label: "Expense", value: "Expense" },
  { label: "Income", value: "Income" },
];

export default function AddTransactionScreen() {
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);

  const isIncome = type === "Income";

  const categoryData = isIncome ? incomeCategoryData : expenseCategoryData;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Transaction</Text>

      <DropdownInputField
        data={transactionType}
        defaultValue="Expense/Income"
        label="Type"
        search={false}
        value={type}
        onChange={(item) => {
          setType(item.value);

          if (item.label === "Income") {
            setCategory("Income");
          } else {
            setCategory(null);
          }
        }}
      />
      <DropdownInputField
        data={categoryData}
        defaultValue="Select a category"
        label="Category"
        value={category}
        onChange={(item) => setCategory(item.value)}
        disabled={isIncome}
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
