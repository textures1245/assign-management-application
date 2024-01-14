import { superValidate } from 'sveltekit-superforms/server';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { PageServerLoad } from './$types';
import type { SuperValidated } from 'sveltekit-superforms';

const teacherSchema = z.object({
	id: z.string(),
	name: z.string(),
	curd: z
		.object({
			created: z.date(),
			updated: z.date().optional(),
			deleted: z.date().optional()
		})
		.optional(),
	imgAvatar: z.string().url().optional(),
	info: z.string().optional().nullable(),
	rank: z.string().optional().nullable()
});

//covert ICourse to z.object

export const load: PageServerLoad = async (event) => {
	const { url } = event;
	let form = {} as SuperValidated<typeof teacherSchema>;
	const instructorId = url.searchParams.get('onUpdateId');
	if (instructorId) {
		const instructor = await _prisma.teacher.findUnique({
			where: {
				id: instructorId
			}
		});
		if (!instructor) {
			throw fail(404, { message: 'Instructor not found' });
		}

		const sanitized = <T extends typeof instructor>(obj: T) => {
			const { imgAvatar, ...rest } = obj;
			return { ...rest, imgAvatar: imgAvatar ?? undefined };
		};

		form = await superValidate(sanitized(instructor), teacherSchema);
	} else {
		form = await superValidate(event, teacherSchema);
	}

	return { form, status: 201, editMode: !!instructorId };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		const form = await superValidate(request, teacherSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			console.log('Failed');
			return fail(400, { form });
		}

		const { name, imgAvatar, info, rank } = form.data;

		try {
			await _prisma.teacher.create({
				data: {
					name,
					imgAvatar,
					info,
					rank,
					accountUserId: locals.userData.id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't create instructor." });
		}

		return { form, status: 201 };
	},
	update: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, teacherSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { name, imgAvatar, info, rank } = form.data;

		try {
			await _prisma.teacher.update({
				where: {
					id: form.data.id
				},
				data: {
					name,
					imgAvatar,
					info,
					rank,
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
		const form = await superValidate(request, teacherSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await _prisma.teacher.delete({
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
