import { TransactionDb } from "@/src/types/Transaction";
import { addTransaction, getTransactions } from "./db/transactions";

export async function saveTransaction(transaction: TransactionDb) {
  await addTransaction(transaction);
}
export async function getAllTransactions() {
  return await getTransactions();
}
