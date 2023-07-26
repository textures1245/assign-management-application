import { writable, type Writable } from 'svelte/store';
import moment from 'moment';

import type { ICourse } from '../types';

export class Course implements ICourse {
	constructor(
		public courseId: string,
		public teacherId: string,
		public imgSrc: string,
		public label: string,
		public curd: { created: number | string; updated: number | string; deleted: number | string },
		public detail?: string,
		public group?: string[]
	) {}

	public getCourse(): ICourse {
		return {
			courseId: this.courseId,
			teacherId: this.teacherId,
			imgSrc: this.imgSrc,
			label: this.label,
			curd: this.curd,
			detail: this.detail,
			group: this.group
		};
	}

	public static createInstance(label: string, detail?: string, imgSrc?: string): Course {
		const [genCourseId, genTeacherId] = crypto.randomUUID();
		const imageSrc = imgSrc
			? imgSrc
			: 'https://myviewboard.com/blog/wp-content/uploads/2020/08/MP0027-01-scaled.jpg';
		const currentUnixTimestamp = moment().valueOf();
		return new Course(
			genCourseId,
			genTeacherId,
			imageSrc,
			label,
			{
				created: currentUnixTimestamp,
				updated: currentUnixTimestamp,
				deleted: currentUnixTimestamp
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
