import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { env } from '../env.js';
import { ensureUploadDir, localPath } from '../services/upload.service.js';

ensureUploadDir();
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, env.UPLOAD_DIR),
  filename: (_req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'))
});
const upload = multer({ storage });

export const uploads = Router();

uploads.post('/image', upload.single('file'), (req, res) => {
  const file = req.file!;
  const url = `${env.PUBLIC_BASE_URL}/uploads/${path.basename(localPath(file.filename))}`;
  res.json({ url });
});
