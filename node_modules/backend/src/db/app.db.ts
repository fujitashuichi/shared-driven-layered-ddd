import sqlite3, { Database } from "sqlite3";

const userSQL = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at INTEGER
  );
`;
const productSQL = `
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT,
    description TEXT,
    status TEXT,
    created_at INTEGER,
    updated_at INTEGER,
    FOREIGN KEY (user_id)
      REFERENCES users(id)
      ON DELETE RESTRICT
  );
`;

export const createAppDb = (fileName: "app.db" | ":memory:"): Promise<Database> => {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(fileName, (err) => {
      if (err) return reject(err);

      db.exec(
          `PRAGMA foreign_keys = ON;
          ${userSQL}
          ${productSQL}
        `,
        (err: Error | null) => {
          if (err) return reject(err);
          return resolve(db);
      })
    });
  });
};
