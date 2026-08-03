import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "node:path";

const app = Fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "..", "frontend", "out"),
  prefix: "/",
});

app.register(
  async (api) => {
    api.get("/health", async () => ({ status: "ok" }));
  },
  { prefix: "/api" }
);

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();