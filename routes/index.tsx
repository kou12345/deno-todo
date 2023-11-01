import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface Article {
  id: string;
  title: string;
  created_at: string;
}

export const handler: Handlers<Article[]> = {
  async GET(_req, ctx) {
    console.log("GET /");
    const articles: Article[] = [
      {
        id: "1",
        title: "Article 1",
        created_at: "2022-06-17T00:00:00.000Z",
      },
      {
        id: "2",
        title: "Article 2",
        created_at: "2022-06-10T00:00:00.000Z",
      },
    ];

    const resp = await ctx.render(articles);
    return resp;
  },
};

export default function Home({ data }: PageProps<Article[]>) {
  console.log("data", data);
  return (
    <div>
      <Head>
        <title>Fresh Blog</title>
      </Head>
      <section>
        <ul>
          {data.map((article) => (
            <li key={article.id}>
              <a href={`articles/${article.id}`}>
                <h3>{article.title}</h3>
                <time dateTime={article.created_at}>{article.created_at}</time>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
