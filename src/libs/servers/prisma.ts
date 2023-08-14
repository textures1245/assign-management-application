import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const prisma = global._prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
	global._prisma = prisma;
}

export { prisma };
