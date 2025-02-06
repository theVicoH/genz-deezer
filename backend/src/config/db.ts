import postgres from 'postgres';
import { config } from './env';

export const sql = postgres({
  host: "localhost",
  port: Number(config.DB_PORT) || 5432,
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  debug: true,
  timeout: 10,
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10
});

sql`SELECT 1`.then(() => {
  console.log('Database connected successfully');
}).catch(err => {
  console.error('Database connection error:', err);
});