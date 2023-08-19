import type { ITeacher } from '../types';
import moment from 'moment';

export class Teacher implements ITeacher {
	constructor(
		public teacherId: string,
		public name: string,
		public curd: { created: Date; updated: Date; deleted: Date },
		public imgAvatar?: string,
		public info?: string,
		public rank?: string
	) {}

	public toPOJO(): ITeacher {
		return {
			teacherId: this.teacherId,
			name: this.name,
			curd: this.curd,
			imgAvatar: this.imgAvatar,
			info: this.info,
			rank: this.rank
		};
	}
}

export const teacherStates = [
	new Teacher(
		'0',
		'Teacher 1',
		{
			created: new Date(),
			updated: new Date(),
			deleted: new Date()
		},
		'https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg'
	)
];
