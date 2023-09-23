import type { ITeacher } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export class Teacher implements ITeacher {
	constructor(
		public teacherId: string = '',
		public name: string = '',
		public curd: { created: Date; updated?: Date; deleted?: Date } = {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		public imgAvatar?: string,
		public info?: string,
		public rank?: string
	) {}

	public objectAssign(obj: ITeacher) {
		Object.assign(this, obj);
		return this;
	}

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

export const teacherStates: Writable<ITeacher[]> = writable([
	{
		teacherId: '1',
		name: 'John Doe',
		curd: {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		teacherId: '2',
		name: 'Jane Doe',
		curd: {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		teacherId: '3',
		name: 'John Doe',
		curd: {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		teacherId: '4',
		name: 'Jane Doe',
		curd: {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		teacherId: '5',
		name: 'John Doe',
		curd: {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		teacherId: '6',
		name: 'Jane Doe',
		curd: {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		imgAvatar: 'https://i.pravatar.cc/300'
	}
]);
