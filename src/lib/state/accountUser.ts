import type { IAccountUser, IAssignment, ICourse, IEnrollment, ITeacher } from '$lib/types';

export type AccountUserProp = IAccountUser & {
	courses: ICourse[];
	teachers: ITeacher[];
	assignments: IAssignment[];
	enrollments: IEnrollment[];
};
