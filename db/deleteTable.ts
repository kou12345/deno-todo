import { db } from "../utility/database.ts";

try {
  const transaction = await db.transaction();

  // const tables = ["users", "todos"];

  // for (const table of tables) {
  //   await transaction.execute({
  //     sql: `DROP TABLE IF EXISTS ?;`,
  //     args: [table],
  //   });
  // }

  await transaction.execute(`DROP TABLE IF EXISTS users;`);

  await transaction.commit();
} catch (error) {
  console.error(error);
}
