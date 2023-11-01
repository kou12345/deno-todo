import { db } from "../utility/database.ts";

const result = await db.execute(
  `INSERT INTO users (title, created_at, updated_at) 
    VALUES 
    ('Test User 1', datetime('now'), datetime('now')),
    ('Test User 2', datetime('now'), datetime('now')),
    ('Test User 3', datetime('now'), datetime('now')
    );`,
);

console.log(result);
