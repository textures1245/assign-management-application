import type { PageServerLoad } from './$types';
import { courseStates } from '../../libs/state/courseStore';
import { fail } from '@sveltejs/kit';
import type { AccountUserProp } from '../../libs/state/accountUser';

export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });

	const courses = userData.course ?? [];
	return {
		courses: courses
	};
};
