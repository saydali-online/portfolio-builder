import jwt from 'jsonwebtoken';
import { ENV } from '../env.js';

export function generateToken(payload: object, expiresIn = '7d') {
  return jwt.sign(payload, ENV.JWT_SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, ENV.JWT_SECRET);
  } catch {
    return null;
  }
}
