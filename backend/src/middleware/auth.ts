import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt.js';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  const decoded = verify(token);
  if (!decoded) return res.status(403).json({ error: 'Invalid token' });

  (req as any).user = decoded;
  next();
}
