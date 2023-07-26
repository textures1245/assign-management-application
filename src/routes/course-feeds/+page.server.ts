import type { PageServerLoad } from './$types';
import { courseStates } from '../../libs/state/courseStore';

export const load: PageServerLoad = async () => {
	const courses = courseStates.map((c) => c.toPOJO());
	return {
		courses: courses
	};
};
