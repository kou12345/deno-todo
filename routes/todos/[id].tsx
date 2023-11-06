import { Handlers, PageProps } from "$fresh/server.ts";
import { Todo } from "../../types/types.ts";
import { db } from "../../utils/database.ts";

interface Data {
  paramsId: string;
  todo: Todo;
}

// TODO データの取得
// TODO コメント機能

export const handler: Handlers<Data> = {
  async GET(_req, ctx) {
    // DBからデータを取得
    const result = (await db.execute({
      sql: "SELECT * FROM todos WHERE id = ?",
      args: [ctx.params.id],
    })).rows;

    console.log(result);

    const todo: Todo = {
      id: Number(result[0].id),
      user_id: Number(result[0].user_id),
      title: String(result[0].title),
      is_done: Boolean(result[0].is_done),
      created_at: new Date(result[0].created_at as string),
      updated_at: new Date(result[0].updated_at as string),
    };

    const resp = await ctx.render({
      paramsId: ctx.params.id,
      todo: todo,
    });

    return resp;
  },
};

export default function Home({ data }: PageProps<Data>) {
  console.log("data", data);
  return (
    <div>
      <p>{data.todo.title}</p>
      <input
        type="checkbox"
        checked={data.todo.is_done}
        className="checkbox checkbox-primary"
      />{" "}
      <p>{data.todo.created_at.toISOString()}</p>
      <p>{data.todo.updated_at.toISOString()}</p>
    </div>
  );
}
