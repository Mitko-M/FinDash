import * as SQLite from "expo-sqlite";
import { TransactionDb } from "@/src/types/Transaction";

let dbPromise: Promise<SQLite.SQLiteDatabase>;

function getDb() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync("findex.db");
  }
  return dbPromise;
}

export async function initDB() {
  const db = await getDb();

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
  const db = await getDb();

  await db.runAsync(
    `INSERT INTO transactions (id, type, category, amount, description, date)
     VALUES (?, ?, ?, ?, ?, ?);`,
    [tx.id, tx.type, tx.category, tx.amount, tx.description, tx.date],
  );
}

export async function getTransactions(): Promise<TransactionDb[]> {
  const db = await getDb();

  return await db.getAllAsync("SELECT * FROM transactions ORDER BY date DESC;");
}

export async function deleteTransaction(id: string) {
  const db = await getDb();

  await db.runAsync("DELETE FROM transactions WHERE id = ?;", [id]);
}
