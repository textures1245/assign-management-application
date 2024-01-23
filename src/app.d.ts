import type { PrismaClient } from '@prisma/client';
import type { AccountUserPayload } from '$lib/types';

declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		interface Locals {
			userData: AccountUserPayload;
		}
		// interface Platform {}
	}
	// eslint-disable-next-line no-var
	const _prisma = global.prisma || new PrismaClient({ log: ['info'] });
	if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

	/// <reference types="lucia-auth" />
}

export {};
