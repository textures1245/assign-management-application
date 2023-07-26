import { writable } from 'svelte/store';
import type { ITeacher } from '../types';
import moment from 'moment';

export class Teacher implements ITeacher {
	constructor(
		public teacherId: string,
		public courseId: string,
		public name: string,
		public curd: { created: number; updated: number; deleted: number },
		public imgAvatar?: string | undefined,
		public info?: string | undefined,
		public rank?: string | undefined
	) {}
}

export const teacherStates = [
	new Teacher('0', '0', 'Teacher 1', {
		created: moment().valueOf(),
		updated: moment().valueOf(),
		deleted: moment().valueOf()
	})
];
