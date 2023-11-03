import type { PageServerLoad } from './$types';
import { type AssignmentProp, createAssignmentProps } from '$lib/state/assignmentStore';

import type { AccountUserProp } from '$lib/state/accountUser';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals, params }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });

	let assignmentProps: AssignmentProp[] = [];

	assignmentProps =
		userData.assignments
			.filter((assign) => assign.courseId === params.id)
			.map((a) => {
				console.log(a)
				return createAssignmentProps(a, userData);
			}) ?? [];

	return { assignmentProps };
};
