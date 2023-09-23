import type { ICourse } from '$lib/types';
import { writable, type Writable } from 'svelte/store';
import type { Teacher } from './teacherStore';
import { teacherStates } from './teacherStore';

export class Course implements ICourse {
	protected teacherProp: Teacher = {} as Teacher;
	constructor(
		public courseId: string = '',
		public teacherId: string = '',
		public courseCode: string = '',
		public imgSrc: string = '',
		public label: string = '',
		public curd: { created: Date; updated?: Date; deleted?: Date } = {
			created: new Date()
		},
		public detail?: string,
		public group?: string[]
	) {
		// const t = teacherStates.subscribe((t) => {));
		// const t = teachers.find((t) => {
		// 	t.teacherId === teacherId;
		// });
		// if (!t) throw new Error('Teacher not found');
		// this.setTeacherProp(t);
	}

	public objectAssign(obj: ICourse) {
		Object.assign(this, obj);
		return this;
	}

	public setTeacherProp(teacher: Teacher): void {
		this.teacherProp = teacher;
	}

	public getTeacherProp(): Teacher {
		return this.teacherProp;
	}

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
			detail,
			['Group 1', 'Group 2', 'Group 3']
		);
	}
}
export const courseStates: Writable<ICourse[]> = writable([
	// generate mock Course object data
	{
		courseId: 'C101',
		courseCode: 'MATH101',
		teacherId: '101',
		imgSrc: 'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=2000',
		label: 'Mathematics 101',
		curd: {
			created: new Date('2023-09-15'),
			updated: undefined, // Optional
			deleted: undefined // Optional
		},
		detail: 'Introduction to basic mathematics concepts.',
		group: ['A', 'B']
	},
	{
		courseId: 'C202',
		courseCode: 'HIST202',
		teacherId: '102',
		imgSrc: 'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=2000',
		label: 'History 202',
		curd: {
			created: new Date('2023-09-20'),
			updated: undefined, // Optional
			deleted: undefined // Optional
		},
		detail: 'Advanced study of historical events.',
		group: ['A']
	}
]);
