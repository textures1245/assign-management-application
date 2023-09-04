import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { courseSchema } from '../libs/types';

export const load: PageServerLoad = async (event) => {
	const courseValidator = await superValidate(event, courseSchema);

	// Always return { form } in load and form actions.
	return { courseValidator };
};
