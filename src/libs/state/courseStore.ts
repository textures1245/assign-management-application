import type { ICourse } from '../types';


export class Course implements ICourse {
	constructor(
		public courseId: string,
		public teacherId: string,
		public courseCode: string,
		public imgSrc: string,
		public label: string,
		public curd: { created: Date; updated: Date; deleted: Date },
		public detail?: string,
		public group?: string[]
	) {}

	public toPOJO(): ICourse {
		return {
			courseId: this.courseId,
			courseCode: this.courseCode,
			teacherId: this.teacherId,
			imgSrc: this.imgSrc,
			label: this.label,
			curd: this.curd,
			detail: this.detail,
			group: this.group
		};
	}

	public static createInstance(label: string, detail?: string, imgSrc?: string): Course {
		const genCourseId = crypto.randomUUID();
		const genTeacherId = crypto.randomUUID();
		const genCourseCode = crypto.randomUUID();
		const imageSrc = imgSrc
			? imgSrc
			: 'https://myviewboard.com/blog/wp-content/uploads/2020/08/MP0027-01-scaled.jpg';
		const currentDate = new Date();
		return new Course(
			genCourseId,
			genTeacherId,
			genCourseCode,
			imageSrc,
			label,
			{
				created: currentDate,
				updated: currentDate,
				deleted: currentDate
			},
			detail
		);
	}
}
export const courseStates: Course[] =  [
	Course.createInstance('Subject 1', 'Subject Details'),
	Course.createInstance('Course 1 ', 'Course Details 2'),
	Course.createInstance('Course 2', 'Course Details 3')
];
