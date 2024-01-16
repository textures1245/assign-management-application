import type { AccountUserProp } from '$lib/state/accountUser';
import type { IAccountUser } from '$lib/types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	return {
		user: <IAccountUser>{ ...(locals.userData as AccountUserProp) }
	};
};
