import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.205.0/http/cookie.ts";
import { decode, verify } from "https://deno.land/x/djwt@v3.0.0/mod.ts";
import { TodoItem } from "../components/TodoItem.tsx";
import { Todo } from "../types/types.ts";
import { db } from "../utils/database.ts";

export const handler: Handlers<Todo[]> = {
  async GET(req, ctx) {
    console.log("GET /");

    const cookies = getCookies(req.headers);
    console.log(cookies);

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(Deno.env.get("JWT_SECRET_KEY") as string),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign", "verify"],
    );

    // jWTの検証
    try {
      const verifyResult = await verify(cookies.token, key);
    } catch (e) {
      console.log("verify error: ", e);
      return new Response("verify error", { status: 401 });
    }

    const [header, payload, signature] = decode(cookies.token);
    console.log("header: ", header);
    console.log("payload: ", payload);
    console.log("signature: ", signature);

    const userId = (payload as { userId: number }).userId;

    const result = (await db.execute({
      sql: "SELECT * FROM todos WHERE user_id = ?",
      args: [userId],
    })).rows;
    console.log(result);

    const todos: Todo[] = [];
    result.map((todo) => {
      console.log(todo);
      todos.push({
        id: Number(todo.id),
        title: String(todo.title),
        is_done: Boolean(todo.is_done),
        created_at: new Date(todo.created_at as string),
        updated_at: new Date(todo.updated_at as string),
      } as Todo);
    });

    const resp = await ctx.render(todos);
    return resp;
  },
};

export default function Home({ data }: PageProps<Todo[]>) {
  console.log("data", data);

  const hoge = `
  {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  }`;

  data.map((todo) => {
    console.log(todo.created_at);
  });
  return (
    <div>
      <Head>
        <title>ToDo</title>
      </Head>
      <button class="btn">hoge</button>
      <section>
        <ul>
          {data.map((todo) => <TodoItem {...todo} />)}
        </ul>
        <pre>
          {hoge}
        </pre>
      </section>
    </div>
  );
}
