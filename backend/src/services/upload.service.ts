import fs from 'fs';
import path from 'path';
import { ENV } from '../env.js';

export const uploadFile = (file: Express.Multer.File) => {
  const uploadDir = path.join(process.cwd(), 'uploads');

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, file.originalname);
  fs.writeFileSync(filePath, file.buffer);

  const baseUrl =
    ENV.NODE_ENV === 'production'
      ? 'https://your-render-domain.onrender.com'
      : `http://localhost:${ENV.PORT}`;

  return `${baseUrl}/uploads/${file.originalname}`;
};
