import db, { initDB } from "../database/db";

export const registerUser = async (username: string, password: string) => {
  const database = await initDB();
  try {
    await database.runAsync(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      username,
      password
    );
    return true;
  } catch (error) {
    console.error("Error inserting user", error);
    return false;
  }
};

export const loginUser = async (username: string, password: string) => {
  const database = await initDB();
  const results = await database.getAllAsync(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password]
  );

  if (results.length > 0) {
    return results[0];
  } else {
    return null;
  }
};
