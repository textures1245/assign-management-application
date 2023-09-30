import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import type { AccountUserProp } from '$lib/state/accountUser';
import type { ICourse, ICourseTeacher } from '$lib/types';
import { DEV_MODE } from '$env/static/private';

export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });
	let courses: ICourseTeacher[] = [];
	// const courses: ICourseTeacher[] = [
	// 	{ ...(userData.course as ICourse[]), teacher: userData.teachers[0] }
	// ];
	if (DEV_MODE !== 'true') {
		courses = userData.course.map((c) => {
			const teacher = userData.teachers.find((t) => t.teacherId === c.teacherId);
			if (!teacher) throw fail(500, { message: 'Teacher not found' });
			return { ...c, teacher };
		});
	} else {
		// ICourseTeacher mockup
		courses = [
			{
				courseId: 'C101',
				courseCode: 'MATH101',
				teacherId: '101',
				imgSrc:
					'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=2000',
				label: 'Mathematics 101',
				curd: {
					created: new Date('2023-09-15'),
					updated: undefined, // Optional
					deleted: undefined // Optional
				},
				detail: 'Introduction to basic mathematics concepts.',
				group: ['A', 'B'],
				teacher: {
					teacherId: '1',
					name: 'Teacher 1',
					imgAvatar: '',
					info: undefined,
					rank: undefined,
					curd: {
						created: new Date(),
						updated: undefined,
						deleted: undefined
					}
				}
			},
			{
				courseId: 'C202',
				courseCode: 'HIST202',
				teacherId: '102',
				imgSrc:
					'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=2000',
				label: 'History 202',
				curd: {
					created: new Date('2023-09-20'),
					updated: undefined, // Optional
					deleted: undefined // Optional
				},
				detail: 'Advanced study of historical events.',
				group: ['A'],
				teacher: {
					teacherId: '2',
					name: 'Teacher 2',
					imgAvatar: '',
					info: undefined,
					rank: undefined,
					curd: {
						created: new Date(),
						updated: undefined,
						deleted: undefined
					}
				}
			}
		];
	}

	return {
		courses,
		status: 200
	};
};
