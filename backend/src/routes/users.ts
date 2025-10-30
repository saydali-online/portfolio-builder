import { Router } from 'express';
import { prisma } from '../prisma.js';
import { requireAuth } from '../middleware/auth.js';

export const users = Router();

users.get('/me', requireAuth, async (req, res) => {
  const id = (req as any).userId as string;
  const me = await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, fullName: true } });
  res.json(me);
});
