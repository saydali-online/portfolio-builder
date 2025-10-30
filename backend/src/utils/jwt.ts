import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { ENV } from '../env.js';

const SECRET: Secret = ENV.JWT_SECRET || 'default-secret';

/** Sign a JWT token */
export function sign(payload: object, expiresIn: string = '7d'): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

/** Verify a JWT token */
export function verify(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
