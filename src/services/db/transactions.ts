import * as SQLite from "expo-sqlite";
import { TransactionDb } from "@/src/types/Transaction";

const db = await SQLite.openDatabaseAsync("findex.db");

export async function initDB() {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      category TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT,
      date TEXT NOT NULL
    );
  `);
}

export async function addTransaction(tx: TransactionDb) {
  await db.runAsync(
    `INSERT INTO transactions (id, type, category, amount, description, date)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [tx.id, tx.type, tx.category, tx.amount, tx.description, tx.date],
  );
}

export async function getTransactions(): Promise<TransactionDb[]> {
  return await db.getAllAsync("SELECT * FROM transactions ORDER BY date DESC;");
}

export async function deleteTransaction(id: string) {
  await db.runAsync("DELETE FROM transactions WHERE id = ?;", [id]);
}
