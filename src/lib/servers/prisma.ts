import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

// const _prisma = global._prisma || new PrismaClient({ log: ['info'] });
// if (env.NODE_ENV !== 'production') {
// 	global._prisma = _prisma;
// }

const _prisma = new PrismaClient({ log: ['info'] });

export { _prisma };
