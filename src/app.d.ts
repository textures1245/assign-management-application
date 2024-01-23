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
	var _prisma: PrismaClient;

	/// <reference types="lucia-auth" />
}
