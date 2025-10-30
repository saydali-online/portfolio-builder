import bcrypt from 'bcryptjs';
import { prisma } from '../prisma.js';

export const UserService = {
  async createUser(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10);
    return prisma.user.create({
      data: { email, password: hashed, name }
    });
  },

  async getUserByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }
};
