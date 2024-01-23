import type { PageServerLoad } from './$types';
import { type AssignmentProp, createAssignmentProps } from '$lib/state/assignmentStore';

import type { AccountUserProp } from '$lib/state/accountUser';
import { fail, type Actions } from '@sveltejs/kit';
import { _prisma } from '$lib/servers/prisma';

export const load: PageServerLoad = async ({ locals, params }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });

	let assignmentProps: AssignmentProp[] = [];

	assignmentProps =
		userData.assignments
			.filter((assign) => assign.courseId === params.id && !assign.isCompleted)
			.map((a) => {
				return createAssignmentProps(a, userData);
			}) ?? [];

	return { assignmentProps };
};

export const actions: Actions = {
	returnAssignment: async ({ locals, request }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });

		const id = await request.formData().then((data) => data.get('id') as string);

		if (!id) throw fail(400, { message: 'Bad Request, cant find request id' });

		try {
			await _prisma.assignment.update({
				where: {
					id
				},
				data: {
					isCompleted: true
				}
			});
		} catch (err) {
			return fail(500, { message: `Could't return completed to assignment ID ${id}.` });
		}

		return { status: 201 };
	}
};
