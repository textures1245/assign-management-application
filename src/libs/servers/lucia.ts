// import { sveltekit } from 'lucia-auth/middleware'
import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';

import { sveltekit } from 'lucia-auth/middleware';
import { dev } from '$app/environment';
import { prismaClient } from './prisma';

export const auth = lucia({
	adapter: prismaAdapter.prisma(prismaClient),
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			accountUserId: userData.id,
			email: userData.email,
			name: userData.name
		};
	}
});

export type Auth = typeof auth;
