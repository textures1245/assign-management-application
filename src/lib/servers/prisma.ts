import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

let _prisma: PrismaClient;

if (env.NODE_ENV === 'production') {
	_prisma = new PrismaClient();
} else {
	// Ensure the prisma instance is re-used during hot-reloading
	// Otherwise, a new client will be created on every reload
	global._prisma = global._prisma || new PrismaClient();
	_prisma = global._prisma;
}

export { _prisma };
