import fs from 'fs';
import path from 'path';
import { env } from '../env.js';

export function ensureUploadDir() {
  if (!fs.existsSync(env.UPLOAD_DIR)) fs.mkdirSync(env.UPLOAD_DIR, { recursive: true });
}

export function localPath(filename: string) {
  return path.join(env.UPLOAD_DIR, filename);
}
