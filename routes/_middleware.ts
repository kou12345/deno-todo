import { getCookies } from "https://deno.land/std@0.205.0/http/cookie.ts";
import { MiddlewareHandlerContext } from "https://deno.land/x/fresh@1.5.2/server.ts";

export async function handler(
  req: Request,
  ctx: MiddlewareHandlerContext,
) {
  const url = new URL(req.url);

  // ERR_TOO_MANY_REDIRECTSを回避するために、/loginにアクセスしたら、そのまま返す
  // url.href === url.origin + "/api/login" /api/loginにアクセスしたら、そのまま返す
  if (
    url.href === url.origin + "/login" || url.href === url.origin + "/api/login"
  ) {
    const resp = await ctx.next();
    return resp;
  }

  const cookies = getCookies(req.headers);

  if (!cookies.token) {
    console.log("cookieがないので、/loginにリダイレクトします");
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login",
      },
    });
  }

  const resp = await ctx.next();
  return resp;
}
