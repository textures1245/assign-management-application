import { handleHooks } from '@lucia-auth/sveltekit';
import { auth } from './libs/servers/lucia';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';

export const customHandle: Handle = async ({ resolve, event }) => {
	return resolve(event);
};

//- used as middleware
export const handle: Handle = sequence(handleHooks(auth), customHandle);
