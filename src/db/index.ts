import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import { config } from '../config';
import * as schema from './schema';

const migrationClient = postgres(config.db.url, { max: 1 });
migrate(drizzle(migrationClient), config.db.migrationConfig);

const conn = postgres(config.db.url);
export const db = drizzle(conn, { schema });
