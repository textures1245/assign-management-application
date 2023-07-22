import { writable, type Writable } from 'svelte/store';
import type { ICourse } from '../types';

export class Course implements ICourse {
	constructor(
		public courseId: string,
		public imgSrc: string,
		public label: string,
		public curd: { created: Date; updated: Date; deleted: Date },
		public detail?: string,
		public group?: string[]
	) {}

	public static createInstance(label: string, detail?: string, imgSrc?: string): Course {
		const genCourseId = crypto.randomUUID();
		const imageSrc = imgSrc
			? imgSrc
			: 'https://myviewboard.com/blog/wp-content/uploads/2020/08/MP0027-01-scaled.jpg';
		return new Course(
			genCourseId,
			imageSrc,
			label,
			{
				created: new Date(),
				updated: new Date(),
				deleted: new Date()
			},
			detail
		);
	}
}

export const courseStates: Writable<Course[]> = writable([
	Course.createInstance('Subject 1', 'Subject Details'),
	Course.createInstance('Course 1 ', 'Course Details 2'),
	Course.createInstance('Course 2', 'Course Details 3')
]);
