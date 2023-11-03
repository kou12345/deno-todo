import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../utils/database.ts";

interface Todo {
  id: number;
  user_id: number;
  title: string;
  is_done: boolean;
  created_at: Date;
  updated_at: Date;
}

export const handler: Handlers<Todo[]> = {
  async GET(_req, ctx) {
    console.log("GET /");
    const result = (await db.execute("SELECT * FROM todos")).rows;
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

  data.map((todo) => {
    console.log(todo.created_at);
  });
  return (
    <div>
      <Head>
        <title>Fresh Blog</title>
      </Head>
      <button class="btn">hoge</button>
      <section>
        <ul>
          {data.map((todo) => (
            <li key={todo.id}>
              <a href={`todos/${todo.id}`}>
                <h3>{todo.title}</h3>
              </a>
              <p>{todo.is_done ? "Done" : "not Done"}</p>
              <time dateTime={todo.created_at.toISOString()}>
                {todo.created_at.toISOString()}
              </time>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
