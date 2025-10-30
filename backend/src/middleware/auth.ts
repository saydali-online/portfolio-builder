import { Request, Response, NextFunction } from 'express';
import { verify } from '../utils/jwt.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = verify<{ id: string }>(token);
    (req as any).userId = payload.id;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
