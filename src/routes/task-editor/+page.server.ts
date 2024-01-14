import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import type { AccountUserProp } from '$lib/state/accountUser';
import type { SuperValidated } from 'sveltekit-superforms';

const assignmentSchema = z.object({
	id: z.string(),
	teacherId: z.string(),
	courseId: z.string(),
	title: z.string(),
	description: z.string(),
	deadline: z.string(),
	priority: z.enum(['MOST', 'DECENT', 'LOW']),
	isCompleted: z.boolean(),
	curd: z
		.object({
			created: z.date(),
			updated: z.date().optional(),
			deleted: z.date().optional()
		})
		.optional()
		.nullable(),
	fileAttached: z
		.union([z.instanceof(File), z.array(z.instanceof(File))])
		.optional()
		.nullable(),
	grade: z.number().optional().nullable(),
	submission: z.string().optional().nullable()
});
export const load: PageServerLoad = async (event) => {
	const { url } = event;
	let form = {} as SuperValidated<typeof assignmentSchema>;
	const taskId = url.searchParams.get('onUpdateId');
	if (taskId) {
		const assignment = await _prisma.assignment.findUnique({
			where: {
				id: taskId
			}
		});
		if (!assignment) {
			throw fail(404, { message: 'Task not found' });
		}

		const sanitized = <T extends typeof assignment>(obj: T) => {
			const { fileAttached, score, submissionDetail, ...rest } = obj;
			return {
				...rest,
				fileAttached: fileAttached?.map((file) => new File([file], file)),
				score: score ?? undefined,
				submissionDetail: submissionDetail ?? undefined,
				deadline: assignment.deadline.toISOString(),
				priority: assignment.priority as 'MOST' | 'DECENT' | 'LOW'
			};
		};

		form = await superValidate(sanitized(assignment), assignmentSchema, {});
	} else {
		form = await superValidate(event, assignmentSchema);
	}

	return { form, status: 201, editMode: !!taskId };
};

export const actions: Actions = {
	create: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, assignmentSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { courseId, title, description, deadline, priority, isCompleted, grade, submission } =
			form.data;

		const teacherId =
			(locals.userData as AccountUserProp)?.courses.find((c) => c?.id === courseId)?.teacherId ??
			null;

		if (!teacherId) return fail(500, { message: "Could't find assignment." });

		try {
			await _prisma.assignment.create({
				data: {
					teacherId,
					courseId,
					title,
					description,
					deadline: new Date(deadline),
					priority,
					isCompleted,
					fileAttached: [],
					score: grade,
					submissionDetail: submission,
					accountUserId: locals.userData.id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't create instructor." });
		}

		return { form };
	},
	update: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, assignmentSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const {
			courseId,
			teacherId,
			title,
			description,
			deadline,
			priority,
			isCompleted,
			grade,
			submission
		} = form.data;

		try {
			await _prisma.assignment.update({
				where: {
					id: form.data.id
				},
				data: {
					teacherId,
					courseId,
					title,
					description,
					deadline: new Date(deadline),
					priority,
					isCompleted,
					fileAttached: [],
					score: grade,
					submissionDetail: submission,
					accountUserId: locals.userData.id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't update assignment." });
		}
	},
	delete: async ({ request, locals }) => {
		if (!locals.userData) throw fail(401, { message: 'Unauthorized' });
		const form = await superValidate(request, assignmentSchema);
		console.log('POST', form.data);

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await _prisma.assignment.delete({
				where: {
					id
				}
			});
		} catch (err) {
			console.error(err);
			return fail(500, { message: "Could't delete assignment." });
		}
	}
};
