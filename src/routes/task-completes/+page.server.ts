import type { PageServerLoad } from './$types';
import { createAssignmentProps, type AssignmentProp } from '$lib/state/assignmentStore';
import type { AccountUserProp } from '$lib/state/accountUser';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });
	let assignmentProps: AssignmentProp[] = [];

	assignmentProps = userData.assignments
		.map((a) => {
			return createAssignmentProps(a, userData);
		})
		.filter((a) => a.assignment.isCompleted);

	return { assignmentProps };
};
