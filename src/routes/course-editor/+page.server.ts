import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { SuperValidated } from 'sveltekit-superforms';

//covert ICourse to z.object
const courseSchema = z.object({
	id: z.string(), // will assigned later
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
	const { url } = event;
	let form = {} as SuperValidated<typeof courseSchema>;
	const courseId = url.searchParams.get('onUpdateId');
	if (courseId) {
		const course = await _prisma.course.findUnique({
			where: {
				id: courseId
			}
		});
		if (!course) {
			throw fail(404, { message: 'Course not found' });
		}
		form = await superValidate({ ...course, detail: course.detail || undefined }, courseSchema, {});
	} else {
		form = await superValidate(event, courseSchema);
	}

	return { form, status: 201, editMode: !!courseId };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, courseSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { teacherId, courseCode, label, imgSrc, detail, group } = form.data;

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
	},
	update: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, courseSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id, teacherId, courseCode, label, imgSrc, detail, group } = form.data;
		console.log(form.data);

		try {
			await _prisma.course.update({
				where: {
					id
				},
				data: {
					teacherId,
					courseCode,
					label,
					imgSrc: imgSrc ?? 'https://as2.ftcdn.net/v2/jpg/01/93/38/87/1000_F_193388734_ufAsvi5JF8B8RsDoswI8nEgbW9Ggsabd.jpg',
					detail: detail ?? '',
					group: group ?? [],
					accountUserId: locals.userData.id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't create instructor." });
		}
	},
	delete: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, courseSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await _prisma.course.delete({
				where: {
					id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't create instructor." });
		}
	}
};
