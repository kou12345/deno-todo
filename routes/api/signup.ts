import { Handlers } from "$fresh/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { db } from "../../utility/database.ts";

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
      sql: "SELECT id FROM users WHERE name = ?",
      args: [username],
    });

    if (result.rows.length > 0) {
      console.log("すでに存在するユーザーです");
      return new Response(null, {
        status: 409,
      });
    }

    // passwordをハッシュ化する
    const passwordHash = await bcrypt.hash(password);
    console.log("passwordHash: ", passwordHash);

    // usersテーブルにINSERTする
    try {
      const result = await db.execute({
        sql:
          "INSERT INTO users (name, password, created_at, updated_at) VALUES (?, ?, ?, ?)",
        args: [
          username,
          passwordHash,
          new Date().toISOString(),
          new Date().toISOString(),
        ],
      });

      console.log("result: ", result);
    } catch (e) {
      console.log(e);
      return new Response(null, {
        status: 500,
      });
    }

    const headers = new Headers();
    headers.set("location", "/");

    return new Response(null, {
      status: 303,
      headers,
    });
  },
};
