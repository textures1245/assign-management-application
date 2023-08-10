/* eslint-disable no-var */
import type { PrismaClient } from '@prisma/client';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			auth: import('lucia-auth').AuthRequest;
		}

		// interface PageData {}
		// interface Platform {}
	}
	var __prisma: PrismaClient;

	namespace Lucia {
		type Auth = import('./libs/servers/lucia').Auth;
		type UserAttributes = {
			email: string;
			name: string;
		};
	}
}

export {};
