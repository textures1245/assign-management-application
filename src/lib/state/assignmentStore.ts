import type { IAssignment, ICourse, ITeacher } from '$lib/types';
import type {
	BubbleDataPoint,
	ChartConfiguration,
	ChartData,
	ChartDataset,
	ChartTypeRegistry,
	Point
} from 'chart.js';
import { writable, type Writable } from 'svelte/store';

export type AssignmentProp = {
	assignment: IAssignment;
	config: ChartConfiguration;
	course: ICourse;
	teacher: ITeacher;
};
export type AssignmentDataset = IAssignment & {
	config: ChartConfiguration;
};

export class Assignment implements IAssignment {
	constructor(
		public assignmentId: string = '',
		public teacherId: string = '',
		public courseId: string = '',
		public title: string = '',
		public description: string = '',
		public deadline: Date = new Date(),
		public priority: 'MOST' | 'DECENT' | 'LOW' = 'MOST',
		public isCompleted: boolean = false,
		public curd: { created: Date; updated?: Date; deleted?: Date } = {
			created: new Date(),
			updated: undefined,
			deleted: undefined
		},
		public fileAttached?: File | File[],
		public score?: number,
		public submissionDetail?: string
	) {}

	public objectAssign(obj: IAssignment) {
		Object.assign(this, obj);
		return this;
	}

	toPOJO(): IAssignment {
		// Convert the Assignment object to a plain JavaScript object (POJO)
		return {
			assignmentId: this.assignmentId,
			teacherId: this.teacherId,
			courseId: this.courseId,
			title: this.title,
			description: this.description,
			deadline: this.deadline,
			priority: this.priority,
			isCompleted: this.isCompleted,
			curd: this.curd,
			fileAttached: this.fileAttached,
			score: this.score,
			submissionDetail: this.submissionDetail
		};
	}
}
export type AssignmentDataVisualize = {
	assignments: ChartConfiguration;
	doneAssignments: ChartConfiguration;
	diaryProgression: ChartConfiguration;
};

export interface CustomPoints {
	x: string | number;
	y: number;
}

// interface DatasetWithoutPoint
// 	extends Omit<
// 		ChartDataset<
// 			keyof ChartTypeRegistry,
// 			(number | [number, number] | Point | BubbleDataPoint | null)[]
// 		>,
// 		'data'
// 	> {
// 	data: (number | [number, number] | BubbleDataPoint | CustomPoints | null)[];
// }

export class AssignmentData implements ChartData {
	constructor(
		public datasets: ChartDataset<
			keyof ChartTypeRegistry,
			(number | [number, number] | CustomPoints | Point | BubbleDataPoint | null)[]
		>[],
		public labels?: unknown[] | undefined
	) {}

	toPOJO() {
		return {
			datasets: this.datasets,
			labels: this.labels
		};
	}
}

export const assignmentStates: Writable<IAssignment[]> = writable([
	{
		assignmentId: '1',
		teacherId: '101',
		courseId: 'A101',
		title: 'Math Homework',
		description: 'Complete exercises 1 to 5 on page 10.',
		deadline: new Date('2023-10-15'),
		priority: 'MOST',
		isCompleted: false,
		curd: {
			created: new Date('2023-09-20'),
			updated: undefined, // Optional
			deleted: undefined // Optional
		},
		fileAttached: undefined, // No files attached
		score: undefined, // No score assigned yet
		submissionDetail: undefined // No submission details
	},
	{
		assignmentId: '2',
		teacherId: '102',
		courseId: 'B202',
		title: 'History Essay',
		description: 'Write an essay on the American Revolution.',
		deadline: new Date('2023-11-05'),
		priority: 'DECENT',
		isCompleted: false,
		curd: {
			created: new Date('2023-09-25'),
			updated: undefined, // Optional
			deleted: undefined // Optional
		},
		fileAttached: undefined, // No files attached
		score: undefined, // No score assigned yet
		submissionDetail: undefined // No submission details
	}
]);

export const assignmentPropState: Writable<AssignmentProp[]> = writable([]);
