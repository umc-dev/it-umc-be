import { defineConfig, env } from "prisma/config";

if (!process.env.DATABASE_URL) {
  // Menggunakan dynamic import atau require untuk loading kondisional
  require("dotenv/config");
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
