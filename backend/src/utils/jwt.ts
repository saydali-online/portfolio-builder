import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../env.js';

export function sign(payload: object, expiresIn: string | number = '7d') {
  const options: SignOptions = { expiresIn: expiresIn as any };
  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function verify<T = any>(token: string) {
  return jwt.verify(token, env.JWT_SECRET) as T;
}
