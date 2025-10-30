import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getMine, upsertPortfolio } from '../services/portfolio.service.js';

const router = express.Router();

router.get('/mine', requireAuth, async (req, res) => {
  const user = (req as any).user;
  const result = await getMine(user.id);
  res.json(result);
});

router.post('/mine', requireAuth, async (req, res) => {
  const user = (req as any).user;
  const result = await upsertPortfolio(user.id, req.body);
  res.json(result);
});

export default router;
