import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { AccountUserProp } from '$lib/state/accountUser';

const assignmentSchema = z.object({
	courseId: z.string(),
	title: z.string(),
	description: z.string(),
	deadline: z.string(),
	priority: z.enum(['MOST', 'DECENT', 'LOW']),
	isCompleted: z.boolean(),
	curd: z.object({
		created: z.date(),
		updated: z.date().optional(),
		deleted: z.date().optional()
	}),
	fileAttached: z.union([z.instanceof(File), z.array(z.instanceof(File))]).optional(),
	score: z.number().optional(),
	submissionDetail: z.string().optional()
});
export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, assignmentSchema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, assignmentSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const {
			courseId,
			title,
			description,
			deadline,
			priority,
			isCompleted,
			fileAttached,
			score,
			submissionDetail
		} = form.data;

		const teacherId =
			(locals.userData as AccountUserProp)?.courses.find((c) => c?.id === courseId)?.teacherId ??
			null;

		if (!teacherId) return fail(400, { message: "Could't find teacher." });

		try {
			await _prisma.assignment.create({
				data: {
					teacherId,
					title,
					courseId,
					description,
					deadline: new Date(deadline),
					priority,
					isCompleted,
					fileAttached: [],
					submissionDetail,
					score,
					accountUserId: locals.userData.id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't create assignment." });
		}

		// TODO: Do something with the validated data

		return { form };
	}
};
