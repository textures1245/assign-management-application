import { writable, type Writable } from 'svelte/store';
import type { CourseMenuInterface } from './types';

export class CourseMenu implements CourseMenuInterface {
	constructor(
		public courseId: string,
		public imgSrc: string,
		public label: string,
		public detail?: string
	) {}

	public static createInstance(label: string, detail?: string, imgSrc?: string): CourseMenu {
		const genCourseId = crypto.randomUUID();
		const imageSrc = imgSrc
			? imgSrc
			: 'https://myviewboard.com/blog/wp-content/uploads/2020/08/MP0027-01-scaled.jpg';
		return new CourseMenu(genCourseId, imageSrc, label, detail);
	}
}

export const courseMenuStates: Writable<CourseMenu[]> = writable([
	CourseMenu.createInstance('Subject 1', 'Subject Details'),
	CourseMenu.createInstance('Course 1 ', 'Course Details 2'),
	CourseMenu.createInstance('Course 2', 'Course Details 3')
]);
