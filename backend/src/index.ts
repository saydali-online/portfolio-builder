import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './env.js';
import uploadsRouter from './routes/uploads.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/uploads', uploadsRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ ok: true, env: ENV.NODE_ENV });
});

// Error handler
app.use((err: any, _req: any, res: any, _next: any) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(ENV.PORT, () => {
  console.log(`✅ Server running on port ${ENV.PORT}`);
});
