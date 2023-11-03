import { db } from "../utils/database.ts";

const result = (await db.execute(
  `SELECT * FROM users;`,
)).rows;

console.log(result);
