// Using deno and deno-kv, create a simple backend with the following features:
// - Authorise using a basic auth header with a hardcoded username and password
// - Allow an authorised user to GET and POST to a key-value store, with a key nominated by the user
// - Allow an unauthorised user to GET from the key-value store
// - Allow an unauthorised user to subscribe to a websocket that will update their value when the key-value store is updated

import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

const app = new Application();
const router = new Router();

const kv = await Deno.openKv()

const setChart = async (id, chart) => {
  await kv.set(['charts', id], chart)
}
const getChart = async (id) => {
  return await kv.get(['charts', id])
}
const watchChart = async (id, callback) => {
  for await (const values of kv.watch([['charts', id]])) {
    const value = values[0].value
    callback(value)
  }
}

const sockets = new Set();

router
  .get("/charts/:id", async (ctx) => {
    if (ctx.isUpgradable) {
      const ws = ctx.upgrade();
      ws.onopen = () => {
        console.log("socket opened");
        ws.send('hello')
      };
      ws.onmessage = (e) => {
        console.log("message", e.data);
      }
      ws.onclose = () => {
        console.log("socket closed");
      }
      watchChart(ctx.params.id, (chart) => {
        ws.send(chart)
      })
    }
    const chart = (await getChart(ctx.params.id))?.value;
    if (chart) {
      ctx.response.body = chart;
      ctx.response.headers.set("Content-Type", "text/plain");
    } else {
      ctx.response.status = 404;
    }
  })
  .post("/charts/:id", async (ctx) => {
    // Require auth header
    const auth = ctx.request.headers.get("Authorization");
    if (!auth || auth !== "Basic dXNlcjpwYXNz") {
      ctx.response.status = 401;
      return;
    }

    const chart = await ctx.request.body().value;
    await setChart(ctx.params.id, chart);
    ctx.response.status = 201;
    return
  });
  
app.use(oakCors());

app.use(router.routes());


app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on: ${secure ? "https://" : "http://"}${hostname ||
      "localhost"}:${port}`,
  );
});

await app.listen({ port: 8000 });

