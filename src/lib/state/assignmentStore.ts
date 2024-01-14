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
import type { AccountUserProp } from './accountUser';

function covertDateToDataset<Dataset extends { start: number; end: number }>(
	dateRecord: Dataset,
	date = new Date()
) {
	const start = new Date(date.getFullYear(), 0, 0);
	const diff = date.getTime() - start.getTime();
	const oneDay = 1000 * 60 * 60 * 24;
	const day = Math.floor(diff / oneDay);

	const totalDays = Math.round((dateRecord['end'] - dateRecord['start']) / (1000 * 60 * 60 * 24));

	return { totalDays, day };
}

export function createAssignmentProps(
	assignment: IAssignment,
	userData?: AccountUserProp
): AssignmentProp {
	let teacher: ITeacher | null = {} as ITeacher;
	let course: ICourse | null = {} as ICourse;

	const dateDataset = {
		start: +assignment.created.getTime(),
		end: +assignment.deadline.getTime()
	};

	const { totalDays, day: currentDay } = covertDateToDataset(dateDataset);

	const datasets = new AssignmentData(
		[
			{
				label: 'Assignment Data Visualization',
				data: [currentDay, totalDays],
				backgroundColor: ['#F1C93B', '#1A5D1A'],
				hoverOffset: 4,
				borderWidth: 0
			}
		],
		['Day used', 'Days left']
	).toPOJO();

	const config = {
		type: 'doughnut',
		data: { ...datasets },
		options: {
			borderRadius: '30',
			responsive: true,
			cutout: '95%',
			spacing: 2,
			plugins: {
				centerText: {
					text: `${datasets.datasets[0].data[1]} Days left`, // You can change this to any desired text
					color: '#fff', // Text color
					fontStyle: 'bold', // Font style (normal, italic, etc.)
					backgroundColor: '#fff', // Background color
					fontSize: 12, // Font size
					sidePadding: 20 // Padding between the chart and center text
				},
				legend: {
					position: 'bottom',
					display: true,
					labels: {
						usePointStyle: true,
						padding: 20,
						font: {
							size: 14
						}
					}
				}
			}
		}
	};

	// get teacher and course from userData
	if (userData) {
		teacher = userData.teachers.find((t) => t.id === assignment.teacherId) ?? null;
		course = userData.courses.find((c) => c.id === assignment.courseId) ?? null;
	}

	if (!teacher) throw new Error('Teacher not found');
	if (!course) throw new Error('Course not found');

	return {
		assignment,
		config: config as ChartConfiguration,
		teacher,
		course
	};
}

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
		public id: string = '',
		public teacherId: string = '',
		public courseId: string = '',
		public title: string = '',
		public description: string = '',
		public deadline: Date = new Date(),
		public priority: 'MOST' | 'DECENT' | 'LOW' = 'MOST',
		public isCompleted: boolean = false,
		public created = new Date(),
		public updated?: Date,
		public deleted?: Date,
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
			id: this.id,
			teacherId: this.teacherId,
			courseId: this.courseId,
			title: this.title,
			description: this.description,
			deadline: this.deadline,
			priority: this.priority,
			isCompleted: this.isCompleted,
			created: this.created,
			updated: this.updated,
			deleted: this.deleted,
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
	// {
	// 	id: '1',
	// 	teacherId: '101',
	// 	courseId: 'A101',
	// 	title: 'Math Homework',
	// 	description: 'Complete exercises 1 to 5 on page 10.',
	// 	deadline: new Date('2023-10-15'),
	// 	priority: 'MOST',
	// 	isCompleted: false,
	// 	curd: {
	// 		created: new Date('2023-09-20'),
	// 		updated: undefined, // Optional
	// 		deleted: undefined // Optional
	// 	},
	// 	fileAttached: undefined, // No files attached
	// 	score: undefined, // No score assigned yet
	// 	submissionDetail: undefined // No submission details
	// },
	// {
	// 	id: '2',
	// 	teacherId: '102',
	// 	courseId: 'B202',
	// 	title: 'History Essay',
	// 	description: 'Write an essay on the American Revolution.',
	// 	deadline: new Date('2023-11-05'),
	// 	priority: 'DECENT',
	// 	isCompleted: false,
	// 	curd: {
	// 		created: new Date('2023-09-25'),
	// 		updated: undefined, // Optional
	// 		deleted: undefined // Optional
	// 	},
	// 	fileAttached: undefined, // No files attached
	// 	score: undefined, // No score assigned yet
	// 	submissionDetail: undefined // No submission details
	// }
]);

export const assignmentPropState: Writable<AssignmentProp[]> = writable([]);
