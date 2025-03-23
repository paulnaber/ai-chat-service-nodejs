import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './src/db/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.DB_URL ||
      'postgres://postgres:postgres@localhost:5432/aichat?sslmode=disable',
  },
});
