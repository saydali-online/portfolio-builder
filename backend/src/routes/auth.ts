import express from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../prisma.js';
import { sign } from '../utils/jwt.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, password: hashed, name }
  });

  const token = sign({ id: user.id, email: user.email });
  res.json({
    message: 'User registered successfully',
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ error: 'Invalid password' });

  const token = sign({ id: user.id, email: user.email });
  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, email: user.email, name: user.name }
  });
});

export default router;
