import 'dotenv/config';

export const ENV = {
  NODE_ENV: process.env.NODE_ENV ?? 'production',
  PORT: Number(process.env.PORT ?? 5000),
  DATABASE_URL: process.env.DATABASE_URL ?? 'file:./dev.db',
  JWT_SECRET: process.env.JWT_SECRET ?? 'dev-secret-change-me'
} as const;
