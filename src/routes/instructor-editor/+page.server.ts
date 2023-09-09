import { superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const teacherSchema = z.object({
	teacherId: z.string(),
	name: z.string(),
	curd: z.object({
		created: z.date(),
		updated: z.date().optional(),
		deleted: z.date().optional()
	}),
	imgAvatar: z.string().url().optional(),
	info: z.string().optional(),
	rank: z.string().optional()
});

//covert ICourse to z.object

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, teacherSchema);

	// Always return { form } in load and form actions.
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, teacherSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		// TODO: Do something with the validated data

		return { form };
	}
};
