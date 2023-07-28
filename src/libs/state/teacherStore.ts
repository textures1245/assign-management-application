import type { ITeacher } from '../types';
import moment from 'moment';

export class Teacher implements ITeacher {
	constructor(
		public teacherId: string,
		public courseId: string,
		public name: string,
		public curd: { created: number; updated: number; deleted: number },
		public imgAvatar?: string,
		public info?: string,
		public rank?: string
	) {}

	public toPOJO(): ITeacher {
		return {
			teacherId: this.teacherId,
			courseId: this.courseId,
			name: this.name,
			curd: this.curd,
			imgAvatar: this.imgAvatar,
			info: this.info,
			rank: this.rank
		};
	}
}

export const teacherStates = [
	new Teacher('0', '0', 'Teacher 1', {
		created: moment().valueOf(),
		updated: moment().valueOf(),
		deleted: moment().valueOf()
	}, 'https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg')
];
