import 'dotenv/config';

export const env = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL!,
  JWT_SECRET: process.env.JWT_SECRET!,
  CORS_ORIGIN: process.env.CORS_ORIGIN || '*',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  PUBLIC_BASE_URL: process.env.PUBLIC_BASE_URL || 'http://localhost:8080'
};
