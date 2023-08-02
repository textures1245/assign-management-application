import moment from 'moment';
import type { IAssignment } from '../types';
import type {
	BubbleDataPoint,
	ChartConfiguration,
	ChartData,
	ChartDataset,
	ChartTypeRegistry,
	Point
} from 'chart.js';
import type { ITeacher } from '../types';

export type AssignmentProp = IAssignment & {
	config: ChartConfiguration;
	teacher: ITeacher;
};

export class Assignment implements IAssignment {
	constructor(
		public assignmentId: string,
		public teacherId: string,
		public courseId: string,
		public title: string,
		public description: string,
		public deadline: number,
		public priority: 'MOST' | 'DECENT' | 'LOW',
		public isCompleted: boolean,
		public curd: { created: number; updated: number; deleted: number },
		public fileAttached?: File | File[] | undefined,
		public score?: number | undefined,
		public submissionDetail?: string | undefined
	) {}

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

export const assignmentStates: Assignment[] = [
	new Assignment('0', '0', '0', 'homework 1', 'asasdw', moment().valueOf(), 'MOST', false, {
		created: moment().valueOf(),
		updated: moment().valueOf(),
		deleted: moment().valueOf()
	}),
	new Assignment('1', '0', '1', 'homework 1', 'asasdw', moment().valueOf(), 'MOST', false, {
		created: moment().valueOf(),
		updated: moment().valueOf(),
		deleted: moment().valueOf()
	})
];
