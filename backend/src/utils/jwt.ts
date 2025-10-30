import jwt, { JwtPayload } from 'jsonwebtoken';
import { ENV } from '../env.js';

const SECRET = ENV.JWT_SECRET as string;

/** Generate JWT */
export function sign(payload: object, expiresIn: string = '7d'): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

/** Verify JWT */
export function verify(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
