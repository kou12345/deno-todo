import type { Handlers, PageProps } from "$fresh/server.ts";
import { getCookies } from "https://deno.land/std@0.204.0/http/cookie.ts";
import { Login } from "../components/Login.tsx";
import { Signup } from "../components/Signup.tsx";
interface Data {
  isAllowed: boolean;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const cookies = getCookies(req.headers);
    console.log(getCookies(req.headers));

    /*
    !はTypeScriptの非nullアサーション演算子です。
    これは、ctx.renderがnullまたはundefinedである可能性があることを示しています。
    しかし、!を使用することで、TypeScriptに対して「この値はnullまたはundefinedではない」と伝えることができます。
    つまり、ctx.renderがnullまたはundefinedである場合、実行時にエラーが発生します。
    */
    // cookies.authは一意な値を生成して利用する
    return ctx.render!({ isAllowed: cookies.auth === "bar" });
  },
};

export default function Home({ data }: PageProps<Data>) {
  return (
    <div>
      <div>
        You currently {data.isAllowed ? "are" : "are not"} logged in.
      </div>
      {!data.isAllowed ? <Login /> : <a href="/api/logout">Logout</a>}

      <hr />
      <h1>Sign Up</h1>
      <Signup />
    </div>
  );
}
