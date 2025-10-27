import * as SQLite from "expo-sqlite";

// Function to get the database instance
let dbInstance: SQLite.SQLiteDatabase | null = null;

export const getDatabase = async (): Promise<SQLite.SQLiteDatabase> => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync("authApp.db");
  }
  return dbInstance;
};

export const initDB = async (): Promise<SQLite.SQLiteDatabase> => {
  try {
    const database = await getDatabase();
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        );`
    );
    return database;
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
};

// Remove the default export since it's not needed
// You can import { getDatabase, initDB } from './database/db' instead
