import { prisma } from '../prisma.js';
import bcrypt from 'bcryptjs';

export async function createUser(email: string, password: string, fullName: string) {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({ data: { email, password: hashed, fullName } });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}
