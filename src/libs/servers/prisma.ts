import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const prismaClient: PrismaClient = (global.__prisma as PrismaClient) || new PrismaClient();

if (env.NODE_ENV === 'development') {
	global.__prisma = prismaClient;
}

export { prismaClient };
