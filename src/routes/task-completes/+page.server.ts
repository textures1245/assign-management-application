import type { PageServerLoad } from './$types';
import {
	AssignmentData,
	assignmentStates,
	type AssignmentProp
} from '../../libs/state/assignmentStore';
import type { ChartConfiguration } from 'chart.js';
import { initialChartConfig } from '../../libs/functions/chart.util';
import { Teacher, teacherStates } from '../../libs/state/teacherStore';
import moment from 'moment';
import { Course, courseStates } from '../../libs/state/courseStore';

export const load: PageServerLoad = async () => {
	const assignments: AssignmentProp[] = assignmentStates.map((assign) => {
		const datasets = new AssignmentData(
			[
				{
					label: 'Assignment Data Visualization',
					data: [300, 50],
					backgroundColor: ['#F1C93B', '#fff'],
					hoverOffset: 4,
					borderWidth: 0
				}
			],
			['Day used', 'Days left']
		).toPOJO();

		const config = initialChartConfig('doughnut', datasets, {
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
		});

		// it should take from database but now we just find on our local state
		const teacherData =
			teacherStates.find((t) => t.teacherId === assign.teacherId) ??
			new Teacher(
				'0',
				'0',
				'Teacher 1',
				{
					created: moment().valueOf(),
					updated: moment().valueOf(),
					deleted: moment().valueOf()
				},
				'https://www.jamsadr.com/images/neutrals/person-donald-900x1080.jpg'
			);

		// it should take from database but now we just find on our local state
		const courseData =
			courseStates.find((c) => c.courseId === assign.courseId) ??
			Course.createInstance('Subject dummy', 'Subject Details');

		return {
			...assign,
			config: config as ChartConfiguration,
			teacher: teacherData.toPOJO(),
			course: courseData.toPOJO()
		};
	});

	return {
		assignments
	};
};
