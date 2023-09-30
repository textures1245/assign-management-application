import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

//covert ICourse to z.object
const courseSchema = z.object({
	courseId: z.string(), // will assigned later
	teacherId: z.string(),
	courseCode: z.string(),
	label: z.string(),
	curd: z
		.object({
			created: z.union([z.number(), z.string()]),
			updated: z.union([z.number(), z.string()]),
			deleted: z.union([z.number(), z.string()])
		})
		.optional(),
	imgSrc: z.string().optional(),
	detail: z.string().optional(),
	group: z.array(z.string()).optional()
});

export const load: PageServerLoad = async (event) => {
	const form = await superValidate(event, courseSchema);

	// Always return { form } in load and form actions.
	return { form, status: 201 };
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, courseSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { teacherId, courseCode, label, curd, imgSrc, detail, group } = form.data;

		try {
			await _prisma.course.create({
				data: {
					teacherId,
					courseCode,
					label,
					imgSrc: imgSrc ?? '',
					detail: detail ?? '',
					group: group ?? [],
					accountUserId: locals.userData.id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't create instructor." });
		}

		// TODO: Do something with the validated data

		return { form, status: 201 };
	}
};
