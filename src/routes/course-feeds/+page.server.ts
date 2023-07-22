import type { PageServerLoad } from '../$types';
import { courseStates } from '../../libs/state/courseStore';

export const load: PageServerLoad = async () => {
	return {
		courses: courseStates
	};
};
