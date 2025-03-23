import * as dotenv from 'dotenv';
import type { MigrationConfig } from 'drizzle-orm/migrator';

type Config = {
  api: APIConfig;
  db: DBConfig;
  auth: AuthConfig;
};

type APIConfig = {
  port: number;
};

type DBConfig = {
  url: string;
  migrationConfig: MigrationConfig;
};

type AuthConfig = {
  certsUrl: string;
};

// make sure the .env file is loaded
dotenv.config();

function envOrThrow(key: string) {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

const migrationConfig: MigrationConfig = {
  migrationsFolder: './src/db/drizzle',
};

export const config: Config = {
  api: {
    port: Number(envOrThrow('PORT')),
  },
  db: {
    url: envOrThrow('DB_URL'),
    migrationConfig: migrationConfig,
  },
  auth: {
    certsUrl: envOrThrow('AUTH_CERTS_URL'),
  },
};
