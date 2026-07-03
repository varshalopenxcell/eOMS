import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';
import { env } from './env';

const client = postgres(env.DATABASE_URL, {
  ssl: 'require'
});

export const db = drizzle(client);
