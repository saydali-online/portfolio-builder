import express from 'express';
import { getPublicByHandle } from '../services/portfolio.service.js';

const router = express.Router();

router.get('/:handle', async (req, res) => {
  const { handle } = req.params;
  const result = await getPublicByHandle(handle);
  res.json(result);
});

export default router;
