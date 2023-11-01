import { db } from "../utility/database.ts";

const deleteResult = await db.execute(
  `DROP TABLE IF EXISTS users;`,
);

console.log(deleteResult);
