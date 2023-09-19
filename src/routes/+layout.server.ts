import type { AccountUserProp } from '$lib/state/accountUser';
import type { IAccountUser } from '$lib/types';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.userData) throw fail(401, { message: 'Unauthorized' });

	return {
		user: <IAccountUser>{ ...(locals.userData as AccountUserProp) }
	};
};
