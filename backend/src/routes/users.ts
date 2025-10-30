import express from 'express';
import { prisma } from '../prisma.js';

const router = express.Router();

// Get user by ID
router.get('/:id', async (req, res) => {
  const userId = Number(req.params.id);

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, createdAt: true }
  });

  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

export default router;
