import { Router } from 'express';
import { registerSchema, loginSchema } from '../utils/validators.js';
import { createUser, findUserByEmail } from '../services/user.service.js';
import bcrypt from 'bcryptjs';
import { sign } from '../utils/jwt.js';

export const auth = Router();

auth.post('/register', async (req, res, next) => {
  try {
    const { email, password, fullName } = registerSchema.parse(req.body);
    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ error: 'Email exists' });
    const user = await createUser(email, password, fullName);
    const token = sign({ id: user.id });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ id: user.id, email: user.email, fullName: user.fullName });
  } catch (e) { next(e); }
});

auth.post('/login', async (req, res, next) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
    const token = sign({ id: user.id });
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.json({ id: user.id, email: user.email, fullName: user.fullName });
  } catch (e) { next(e); }
});

auth.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
});
