import SQLite from "react-native-sqlite-storage";

SQLite.enablePromise(true);

const db = SQLite.openDatabase({ name: "authApp.db", location: "default" });

export const initDB = async () => {
  const database = await db;
  await database.executeSql(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    );`
  );
  return database;
};

export default db;
