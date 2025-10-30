import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(helmet());
app.use(cors({ origin: '*', credentials: false }));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

// --- Health & basic routes ---
app.get('/health', (_req, res) => res.json({ ok: true, env: ENV.NODE_ENV }));
app.get('/api/public/:username', (req, res) => {
  res.json({ username: req.params.username, profile: { about: 'Coming soon' }});
});

// --- Serve built frontend locally if ever needed ---
app.use('/_static', express.static(path.join(__dirname, '..', '..', 'frontend', 'public')));

app.use((err: any, _req: any, res: any, _next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(ENV.PORT, () => {
  console.log(`API up on http://localhost:${ENV.PORT}`);
});
