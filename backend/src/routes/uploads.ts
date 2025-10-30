import express from 'express';
import multer from 'multer';
import { uploadFile } from '../services/upload.service.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const fileUrl = uploadFile(req.file);
  res.json({ url: fileUrl });
});

export default router;
