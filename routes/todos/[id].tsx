import { Handlers, PageProps } from "$fresh/server.ts";

interface Data {
  paramsId: number;
}

// TODO データの取得
// TODO コメント機能

export const handler: Handlers<Data> = {
  async GET(req, ctx) {
    const resp = await ctx.render({ paramsId: Number(ctx.params.id) });
    return resp;
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <h1>Todo: {data.paramsId}</h1>
    </div>
  );
}
