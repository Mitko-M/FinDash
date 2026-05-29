import { TransactionDb } from "@/src/types/Transaction";
import { addTransaction } from "./db/transactions";

export async function saveTransaction(transaction: TransactionDb) {
  await addTransaction(transaction);
}
