import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { db } from "../utils/database.ts";

interface User {
  id: number;
  title: string;
  is_done: boolean;
  created_at: Date;
  updated_at: Date;
}

export const handler: Handlers<User[]> = {
  async GET(_req, ctx) {
    console.log("GET /");
    const result = (await db.execute("SELECT * FROM users")).rows;
    console.log(result);

    const users: User[] = [];
    result.map((user) => {
      console.log(user);
      users.push({
        id: Number(user.id),
        title: String(user.title),
        is_done: Boolean(user.is_done),
        created_at: new Date(user.created_at as string),
        updated_at: new Date(user.updated_at as string),
      } as User);
    });

    const resp = await ctx.render(users);
    return resp;
  },
};

export default function Home({ data }: PageProps<User[]>) {
  console.log("data", data);

  data.map((user) => {
    console.log(user.created_at);
  });
  return (
    <div>
      <Head>
        <title>Fresh Blog</title>
      </Head>
      <section>
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              <a href={`users/${user.id}`}>
                <h3>{user.title}</h3>
              </a>
              <p>{user.is_done ? "Done" : "not Done"}</p>
              <time dateTime={user.created_at.toISOString()}>
                {user.created_at.toISOString()}
              </time>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
