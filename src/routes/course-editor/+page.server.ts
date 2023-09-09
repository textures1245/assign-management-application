import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

//covert ICourse to z.object
const courseSchema = z.object({
	courseId: z.string(),
	teacherId: z.string(),
	courseCode: z.string(),
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

export const load: PageServerLoad = async () => {
	const form = await superValidate(courseSchema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	addCourse: async ({ request }) => {
		const form = await superValidate(request, courseSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Do something with the validated data

		return { form };
	}
};
