import { JWT_ACCESS_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

import type { AccountUserPayload } from './libs/types';
import { prisma } from './libs/servers/prisma';
import { fail } from '@sveltejs/kit';

export const handle = async ({ event, resolve }) => {
	const authCookie = event.cookies.get('AuthorizationToken');

	if (authCookie) {
		const token = authCookie.split(' ')[1];
		try {
			const jwtUser = jwt.verify(token, JWT_ACCESS_SECRET);
			const user: AccountUserPayload = await prisma.accountUser.findUnique({
				where: {
					id: (jwtUser as jwt.JwtPayload).id
				},
				select: {
					id: true,
					name: true,
					courses: true,
					teachers: true,
					assignments: true,
					enrollments: true,
					email: true
				}
			});
			if (user) {
				event.locals.userData = user;
			}
		} catch (error) {
			console.log(error);
		}
	}
	return await resolve(event);
};
