import { db } from "../utils/database.ts";

const result = await db.execute(
  `INSERT INTO todos (user_id, title, created_at, updated_at) 
    VALUES 
    (2, 'firsttask', datetime('now'), datetime('now')),
    (2, 'deno', datetime('now'), datetime('now')),
    (2, 'fresh', datetime('now'), datetime('now')
    );`,
);

console.log(result);
