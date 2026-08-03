import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "node:path";
import { exec } from "node:child_process";
import { prisma } from "./db";

const app = Fastify({ logger: true });

app.register(fastifyStatic, {
  root: path.join(__dirname, "..", "..", "frontend", "out"),
  prefix: "/",
});

app.register(
  async (api) => {
    api.get("/health", async () => ({ status: "ok" }));

    // Lista todas as categorias
    api.get("/categories", async () => {
      return prisma.category.findMany({
        orderBy: { name: "asc" },
      });
    });

    // Cria uma categoria nova
    api.post<{ Body: { name: string; slug: string } }>(
      "/categories",
      async (request, reply) => {
        const { name, slug } = request.body;
        const category = await prisma.category.create({
          data: { name, slug },
        });
        return reply.code(201).send(category);
      }
    );

    // Lista artigos (opcionalmente filtrando por categoria via query ?categorySlug=)
    api.get<{ Querystring: { categorySlug?: string } }>(
      "/articles",
      async (request) => {
        const { categorySlug } = request.query;
        return prisma.article.findMany({
          where: categorySlug
            ? { category: { slug: categorySlug } }
            : undefined,
          include: { category: true },
          orderBy: { createdAt: "desc" },
        });
      }
    );

    // Busca um artigo pelo slug
    api.get<{ Params: { slug: string } }>(
      "/articles/:slug",
      async (request, reply) => {
        const article = await prisma.article.findUnique({
          where: { slug: request.params.slug },
          include: { category: true },
        });
        if (!article) {
          return reply.code(404).send({ error: "Artigo não encontrado" });
        }
        return article;
      }
    );

    // Cria um artigo (rascunho, published: false por padrão)
    api.post<{
      Body: {
        title: string;
        slug: string;
        metaDescription: string;
        content: string;
        categoryId: string;
      };
    }>("/articles", async (request, reply) => {
      const article = await prisma.article.create({
        data: request.body,
      });
      return reply.code(201).send(article);
    });

    // Publica um artigo e dispara rebuild do Next.js
    api.post<{ Params: { id: string } }>(
      "/articles/:id/publish",
      async (request, reply) => {
        const article = await prisma.article.update({
          where: { id: request.params.id },
          data: { published: true, publishedAt: new Date() },
        });

        exec(
          "npm run build --prefix ../frontend",
          (err, stdout, stderr) => {
            if (err) {
              app.log.error({ err, stderr }, "Falha no rebuild do Next.js");
              return;
            }
            app.log.info("Rebuild concluído após publicar artigo " + article.id);
          }
        );

        return reply.send({ status: "publishing", article });
      }
    );
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