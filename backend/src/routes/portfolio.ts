import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { portfolioSchema } from '../utils/validators.js';
import { getMine, upsertPortfolio } from '../services/portfolio.service.js';
import { z } from 'zod';

export const portfolio = Router();

portfolio.get('/mine', requireAuth, async (req, res, next) => {
  try { res.json(await getMine((req as any).userId)); } catch (e) { next(e); }
});

portfolio.put('/mine', requireAuth, async (req, res, next) => {
  try {
    const parsed = portfolioSchema.extend({
      visibility: z.enum(['PUBLIC', 'PRIVATE']).default('PUBLIC')
    }).parse(req.body);
    const updated = await upsertPortfolio((req as any).userId, parsed);
    res.json(updated);
  } catch (e) { next(e); }
});
