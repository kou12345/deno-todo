import { Head } from "$fresh/runtime.ts";
import { LayoutProps } from "https://deno.land/x/fresh@1.5.2/server.ts";

export default function Layout({ Component, state }: LayoutProps) {
  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <body>
        <Component />
      </body>
    </div>
  );
}
