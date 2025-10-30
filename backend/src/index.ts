import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { env } from './env.js';
import { auth } from './routes/auth.js';
import { users } from './routes/users.js';
import { portfolio } from './routes/portfolio.js';
import { pub } from './routes/public.js';
import { uploads } from './routes/uploads.js';
import { errorHandler } from './middleware/error.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve(env.UPLOAD_DIR)));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/auth', auth);
app.use('/users', users);
app.use('/portfolio', portfolio);
app.use('/public', pub);
app.use('/upload', uploads);

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../../frontend/public')));

// Catch-all for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend/public/index.html'));
});

app.use(errorHandler);

app.listen(env.PORT, () => console.log(`API on http://localhost:${env.PORT}`));
