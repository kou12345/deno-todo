import { db } from "../utility/database.ts";

console.log(db);

const createResult = await db.execute(
  `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    title TEXT NOT NULL, 
    is_done INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL, 
    updated_at TEXT NOT NULL
    );`,
);

console.log(createResult);
