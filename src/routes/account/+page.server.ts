import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Prisma } from '@prisma/client';

import bcrypt from 'bcrypt';
import { HASH_KEY, JWT_ACCESS_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export const load: PageServerLoad = async ({ locals }) => {
	const user = locals.user;

	if (!user) {
		return redirect(304, 'account');
	}
	return { user };
};

export const actions: Actions = {
	signIn: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
			const user = await _prisma.accountUser.findUnique({
				where: {
					email
				}
			});

			if (user) {
				const valid = await bcrypt.compare(password, user?.password);
				const token = jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: `${15 * 60 * 1000}` });

				if (!valid) {
					return fail(400, { message: 'Invalid password' });
				} else {
					cookies.set('AuthorizationToken', `Bearer ${token}`, {
						httpOnly: true,
						secure: true,
						sameSite: 'strict',
						maxAge: 60 * 60 * 24,
						path: '/'
					});
				}
			}

			//- set token
			throw redirect(302, '/overviews');
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not login user.' });
		}
	},

	signUp: async ({ request, cookies }) => {
		const { name, email, password } = Object.fromEntries(await request.formData()) as {
			name: string;
			email: string;
			password: string;
		};

		try {
			const user = await _prisma.accountUser.create({
				data: {
					name,
					email,
					password: await bcrypt.hash(password, HASH_KEY)
				}
			});
			const token = jwt.sign(user, JWT_ACCESS_SECRET, { expiresIn: `${15 * 60 * 1000}` });

			//- set token
			cookies.set('AuthorizationToken', `Bearer ${token}`, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24,
				path: '/'
			});
			throw redirect(302, '/account');
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not register account user' });
		}
	}
};
