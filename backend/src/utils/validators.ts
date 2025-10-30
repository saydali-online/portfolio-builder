import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(2),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const portfolioSchema = z.object({
  handle: z.string().min(3).regex(/^[a-z0-9-]+$/i),
  accountType: z.enum(['FREE', 'PREMIUM']).default('FREE'),
  fullName: z.string().min(2),
  email: z.string().email(),
  specialization: z.string().optional().default(''),
  bio: z.string().max(2000).optional().default(''),
  links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
  languages: z.array(z.string()).default([])
});
