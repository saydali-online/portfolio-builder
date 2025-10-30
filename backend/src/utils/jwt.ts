import jwt, { JwtPayload, Secret, SignOptions, StringValue } from 'jsonwebtoken';
import { ENV } from '../env.js';

const SECRET: Secret = ENV.JWT_SECRET || 'default-secret';

/** Generate a JWT */
export function sign(payload: object, expiresIn: StringValue = '7d'): string {
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
