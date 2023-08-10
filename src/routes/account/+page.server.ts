import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from './../../libs/servers/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	let session: Readonly<{
		sessionId: string;
		userId: string;
		activePeriodExpiresAt: Date;
		idlePeriodExpiresAt: Date;
		state: 'idle' | 'active';
		fresh: boolean;
	}> | null = null;


	try {
		session = await locals.auth.validate();
	} catch (e) {
		session = null;
	}

	if (session) {
		return redirect(302, '/overviews');
	}
};

export const actions: Actions = {
	signIn: async ({ request, locals }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
			const key = await auth.useKey('email', email, password);
			const session = await auth.createSession(key.userId);
			locals.auth.setSession(session);
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not login user.' });
		}
		throw redirect(302, '/account');
	},

	signUp: async ({ request }) => {
		const { name, email, password } = Object.fromEntries(await request.formData()) as {
			name: string;
			email: string;
			password: string;
		};

		try {
			await auth.createUser({
				primaryKey: {
					providerId: 'email',
					providerUserId: 'email',
					password
				},
				attributes: {
					email,
					name
				}
			});
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not register account user' });
		}
		throw redirect(302, '/login');
	}
};
