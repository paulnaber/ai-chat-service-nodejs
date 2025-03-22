import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/db/schema.ts',
    out: './src/db/drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        url:
            process.env.DB_URL ||
            'postgres://username:password@localhost:5432/chirpy?sslmode=disable'
    }
});
