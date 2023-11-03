import type { ITeacher } from '$lib/types';
import { writable, type Writable } from 'svelte/store';

export class Teacher implements ITeacher {
	constructor(
		public id: string = '',
		public name: string = '',
		public created = new Date(),
		public updated?: Date,
		public deleted?: Date,
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
			id: this.id,
			name: this.name,
			created: this.created,
			updated: this.updated,
			deleted: this.deleted,
			imgAvatar: this.imgAvatar,
			info: this.info,
			rank: this.rank
		};
	}
}

export const teacherStates: Writable<ITeacher[]> = writable([
	{
		id: '1',
		name: 'John Doe',
		created: new Date(),
		updated: undefined,
		deleted: undefined,
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		id: '2',
		name: 'Jane Doe',
		created: new Date(),
		updated: undefined,
		deleted: undefined,
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		id: '3',
		name: 'John Doe',
		created: new Date(),
		updated: undefined,
		deleted: undefined,
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		id: '4',
		name: 'Jane Doe',
		created: new Date(),
		updated: undefined,
		deleted: undefined,
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		id: '5',
		name: 'John Doe',
		created: new Date(),
		updated: undefined,
		deleted: undefined,
		imgAvatar: 'https://i.pravatar.cc/300',
		info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
		rank: 'Professor'
	},
	{
		id: '6',
		name: 'Jane Doe',
		created: new Date(),
		updated: undefined,
		deleted: undefined,
		imgAvatar: 'https://i.pravatar.cc/300'
	}
]);
