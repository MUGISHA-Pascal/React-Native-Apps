import { initDB } from "../database/db";

export const registerUser = async (username: string, password: string) => {
  const database = await initDB();
  try {
    await database.executeSql(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      [username, password]
    );
    return true;
  } catch (error) {
    console.log("Error inserting user", error);
    return false;
  }
};

export const loginUser = async (username: string, password: string) => {
  const database = await initDB();
  const results = await database.executeSql(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );
  const rows = results[0].rows;
  if (rows.length > 0) {
    return rows.item(0);
  } else {
    return null;
  }
};
