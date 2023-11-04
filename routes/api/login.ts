import { Handlers } from "$fresh/server.ts";
import { setCookie } from "https://deno.land/std@0.204.0/http/cookie.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create, decode } from "https://deno.land/x/djwt@v3.0.0/mod.ts";
import { db } from "../../utils/database.ts";

// これどこに書くのが正しいのか分からない
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(Deno.env.get("JWT_SECRET_KEY") as string),
  { name: "HMAC", hash: "SHA-512" },
  false,
  ["sign", "verify"],
);

export const handler: Handlers = {
  async POST(req) {
    const url = new URL(req.url);
    console.log("url: ", url);

    const form = await req.formData();

    const username = form.get("username") as string;
    if (!username) {
      return new Response(null, {
        status: 400,
      });
    }

    const password = form.get("password") as string;
    if (!password) {
      return new Response(null, {
        status: 400,
      });
    }

    // usersテーブルに存在するか確認する
    const result = await db.execute({
      sql: "SELECT id, password FROM users WHERE name = ?",
      args: [username],
    });

    console.log("result: ", result.rows[0]["id"]);

    if (result.rows.length === 0) {
      console.log("存在しないユーザーです");
      return new Response(null, {
        status: 404,
      });
    }

    const passwordHash = result.rows[0]["password"] as string;

    // passwordの検証
    const passwordValid = await bcrypt.compare(password, passwordHash);
    console.log("passwordValid: ", passwordValid);

    if (passwordValid) {
      // JWTの生成
      // const key = await crypto.subtle.importKey(
      //   "raw",
      //   new TextEncoder().encode(Deno.env.get("JWT_SECRET_KEY") as string),
      //   { name: "HMAC", hash: "SHA-512" },
      //   false,
      //   ["sign", "verify"],
      // );

      const jwt = await create({ alg: "HS512", typ: "JWT" }, {
        userId: result.rows[0]["id"] as string,
      }, key);

      const [header, payload, signature] = decode(jwt);
      console.log("header: ", header);
      console.log("payload: ", payload);
      console.log("signature: ", signature);

      const headers = new Headers();
      setCookie(headers, {
        name: "token",
        value: jwt,
        maxAge: 120,
        sameSite: "Lax", // this is important to prevent CSRF attacks
        domain: url.hostname,
        path: "/",
        secure: true,
      });

      headers.set("location", "/");
      return new Response(null, {
        status: 303, // "See Other"
        headers,
      });
    } else {
      console.error("Invalid password");
      return new Response(null, {
        status: 403,
      });
    }
  },
};
