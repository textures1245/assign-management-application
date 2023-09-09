import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const assignmentSchema = z.object({
	assignmentId: z.string(),
	teacherId: z.string(),
	courseId: z.string(),
	title: z.string(),
	description: z.string(),
	deadline: z.date(),
	priority: z.enum(['MOST', 'DECENT', 'LOW']),
	isCompleted: z.boolean(),
	curd: z.object({
		created: z.date(),
		updated: z.date().optional(),
		deleted: z.date().optional()
	}),
	fileAttached: z.union([z.instanceof(File), z.array(z.instanceof(File))]).optional(),
	grade: z.number().optional(),
	submission: z.string().optional()
});
export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, assignmentSchema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, assignmentSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Do something with the validated data

		return { form };
	}
};
