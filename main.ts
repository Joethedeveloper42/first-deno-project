import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const port = 8080;

// Logger
app.use(async (ctx: any, next: Function) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx: any, next: Function) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

// Hello World!
app.use((ctx: any) => {
  console.log("Received")
  ctx.response.body = "First test";
});

console.log(`Listening on PORT: ${port}`)

await app.listen({ port });