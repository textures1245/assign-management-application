import type { PageServerLoad } from './$types';
import { courseStates } from '../../libs/state/courseStore';
import { Course } from '../../libs/state/courseStore';
import { fail, error } from '@sveltejs/kit';
import type { ICourse } from '../../libs/types';

export const load: PageServerLoad = async () => {
	let coursesData: ICourse[] = [];

	// Subscribe to the store and get the data
	const unsubscribe = courseStates.subscribe((courses) => {
		coursesData = courses.map((c) => c.getCourse());
	});

	// Unsubscribe from the store when the load function is finished
	// This ensures that there are no lingering subscriptions
	// and avoids potential memory leaks
	unsubscribe();

	return {
		courses: coursesData
	};
};
