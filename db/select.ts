import { db } from "../utility/database.ts";

const result = (await db.execute(
  `SELECT * FROM users;`,
)).rows;

console.log(result);
