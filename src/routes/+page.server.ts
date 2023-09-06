import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

const courseSchema = z.object({
	courseId: z.string(),
	teacherId: z.string(),
	imgSrc: z.string(),
	label: z.string(),
	curd: z.object({
		created: z.union([z.number(), z.string()]),
		updated: z.union([z.number(), z.string()]),
		deleted: z.union([z.number(), z.string()])
	}),
	detail: z.string().optional(),
	group: z.array(z.string()).optional()
});

export const load: PageServerLoad = async (event) => {
	const courseValidator = await superValidate(event, courseSchema);

	// Always return { form } in load and form actions.
	return { courseValidator };
};

export const actions: Actions = {
	addCourse: async ({ request }) => {
		const courseValidator = await superValidate(request, courseSchema);
		console.log('POST', courseValidator);

		if (!courseValidator.valid) {
			return fail(400, { courseValidator });
		}

		// TODO: Do something with the validated data

		return { courseValidator };
	}
};
