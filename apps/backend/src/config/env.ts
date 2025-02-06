import { config as dotenvConfig } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const envPath = join(__dirname, '..', '..', '..', '..', '.env');

dotenvConfig({ path: envPath });

declare module 'bun' {
  interface Env {
    JWT_SECRET: string;
    JWT_EXPIRATION: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
  }
}

if (!process.env['JWT_SECRET'] || !process.env['JWT_EXPIRATION']) {
  throw new Error('Les variables JWT_SECRET et JWT_EXPIRATION sont requises');
}

export const config = {
  JWT_SECRET: process.env['JWT_SECRET']!,
  JWT_EXPIRATION: process.env['JWT_EXPIRATION']!,
  DB_HOST: process.env['DB_HOST'],
  DB_PORT: process.env['DB_PORT'],
  DB_NAME: process.env['DB_NAME'],
  DB_USER: process.env['DB_USER'],
  DB_PASSWORD: process.env['DB_PASSWORD'],
  SERVER_PORT: process.env['SERVER_PORT']
} as const;