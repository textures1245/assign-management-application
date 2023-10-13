import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import type { AccountUserProp } from '$lib/state/accountUser';
import type {  ICourseTeacher } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });
	let courses: ICourseTeacher[] = [];
	// const courses: ICourseTeacher[] = [
	// 	{ ...(userData.course as ICourse[]), teacher: userData.teachers[0] }
	// ];

	if (userData.courses) {
		courses = userData.courses.map((c) => {
			const teacher = userData.teachers.find((t) => t.id === c.teacherId);
			if (!teacher) throw fail(500, { message: 'Teacher not found' });
			return { ...c, teacher };
		});
	}

	return {
		courses,
		status: 200
	};
};
