import { prisma } from '../prisma.js';

export function getPublicByHandle(handle: string) {
  return prisma.portfolio.findFirst({
    where: { handle, visibility: 'PUBLIC' },
    include: { owner: { select: { fullName: true } } }
  });
}

export function upsertPortfolio(userId: string, data: any) {
  return prisma.portfolio.upsert({
    where: { ownerId: userId },
    create: { ...data, ownerId: userId },
    update: { ...data }
  });
}

export function getMine(userId: string) {
  return prisma.portfolio.findUnique({ where: { ownerId: userId } });
}
