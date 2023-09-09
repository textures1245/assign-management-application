import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { Prisma } from '@prisma/client';

import bcrypt from 'bcrypt';
import { HASH_KEY, JWT_ACCESS_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import { prisma } from '$lib/servers/prisma';

export const actions: Actions = {
	signIn: async ({ request, cookies }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as {
			email: string;
			password: string;
		};

		try {
			const user = await prisma.accountUser.findUnique({
				where: {
					email
				}
			});

			if (user) {
				const valid = await bcrypt.compare(password, user?.password);
				const token = jwt.sign(user, JWT_ACCESS_SECRET, {
					expiresIn: '1d'
				});

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
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not login user.' });
		}
		throw redirect(302, '/overviews');
	},

	signUp: async ({ request, cookies }) => {
		const { name, email, password } = Object.fromEntries(await request.formData()) as {
			name: string;
			email: string;
			password: string;
		};

		console.log(HASH_KEY);
		try {
			const user = await prisma.accountUser.create({
				data: {
					name,
					email,
					password: await bcrypt.genSalt(13).then(async (salt) => {
						return bcrypt.hash(password, salt).then((hash) => {
							console.log(`info: hash generated: ${hash}`);
							return hash;
						});
					})
				}
			});
			const token = jwt.sign(user, JWT_ACCESS_SECRET, {
				expiresIn: '1d'
			});

			//- set token
			cookies.set('AuthorizationToken', `Bearer ${token}`, {
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24,
				path: '/'
			});
		} catch (err) {
			console.error(err);
			return fail(400, { message: 'Could not register account user' });
		}
		throw redirect(302, '/account');
	}
};
