import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import type { AccountUserProp } from '$lib/state/accountUser';
import type { ICourseTeacher } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });

	const courses: ICourseTeacher[] = [{ ...userData.course, teacher: userData.teachers[0] }];

	return {
		courses
	};
};
