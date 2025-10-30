import { Router } from 'express';
import { getPublicByHandle } from '../services/portfolio.service.js';

export const pub = Router();

// Public profile: GET /public/:handle
pub.get('/:handle', async (req, res, next) => {
  try {
    const data = await getPublicByHandle(req.params.handle);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (e) { next(e); }
});
