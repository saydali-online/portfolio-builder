import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import { ENV } from '../env.js';

const SECRET: Secret = ENV.JWT_SECRET || 'default-secret';

// Allowed values for expiresIn (per jsonwebtoken docs)
type ExpiresIn =
  | number
  | '1s' | '2s' | '5s' | '10s'
  | '1m' | '5m' | '10m' | '15m' | '30m'
  | '1h' | '2h' | '4h' | '8h' | '12h'
  | '1d' | '2d' | '3d' | '7d' | '30d';

/** Generate a JWT */
export function sign(payload: object, expiresIn: ExpiresIn = '7d'): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

/** Verify a JWT */
export function verify(token: string): string | JwtPayload | null {
  try {
    return jwt.verify(token, SECRET);
  } catch {
    return null;
  }
}
