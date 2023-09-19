import type { PageServerLoad } from './$types';
import {
	AssignmentData,
	assignmentStates,
	type AssignmentDataset,
	type AssignmentProp
} from '$lib/state/assignmentStore';
import type { IAssignment } from '$lib/types';
import type { ChartConfiguration, ChartData } from 'chart.js';
import type { AccountUserProp } from '$lib/state/accountUser';
import { fail } from '@sveltejs/kit';
import { teacherStates } from '$lib/state/teacherStore';
import { courseStates } from '$lib/state/courseStore';
export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });
	let assignmentProps: AssignmentProp[] = [];
	assignmentStates.subscribe((assignments) => {
		assignmentProps = assignments.map((a) => {
			const dateDataset = {
				start: a.curd.created.getDay(),
				end: a.deadline.getDay()
			};
			const datasets = new AssignmentData(
				[
					{
						label: 'Assignment Data Visualization',
						data: [dateDataset.start, dateDataset.end],
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
							color: '#000', // Text color
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
			return {
				...a,
				config: config as ChartConfiguration,
				teachers:
					userData.teachers.find((t) => t.teacherId === a.teacherId) ?? teacherStates[0].toPOJO(),
				courses: userData.course.find((c) => c.courseId === a.courseId) ?? courseStates[0].toPOJO()
			};
		});
	});

	// const assignments: AssignmentProp[] = assignmentStates.map((a) => {
	// 	const datasets = new AssignmentData(
	// 		[
	// 			{
	// 				label: 'Assignment Data Visualization',
	// 				data: [300, 50],
	// 				backgroundColor: ['#F1C93B', '#1A5D1A'],
	// 				hoverOffset: 4,
	// 				borderWidth: 0
	// 			}
	// 		],
	// 		['Day used', 'Days left']
	// 	).toPOJO();
	// 	const config = {
	// 		type: 'doughnut',
	// 		data: { ...datasets },
	// 		options: {
	// 			borderRadius: '30',
	// 			responsive: true,
	// 			cutout: '95%',
	// 			spacing: 2,
	// 			plugins: {
	// 				centerText: {
	// 					text: `${datasets.datasets[0].data[1]} Days left`, // You can change this to any desired text
	// 					color: '#000', // Text color
	// 					fontStyle: 'bold', // Font style (normal, italic, etc.)
	// 					backgroundColor: '#fff', // Background color
	// 					fontSize: 12, // Font size
	// 					sidePadding: 20 // Padding between the chart and center text
	// 				},
	// 				legend: {
	// 					position: 'bottom',
	// 					display: true,
	// 					labels: {
	// 						usePointStyle: true,
	// 						padding: 20,
	// 						font: {
	// 							size: 14
	// 						}
	// 					}
	// 				}
	// 			}
	// 		}
	// 	};
	// 	return {
	// 		...a,
	// 		config: config as ChartConfiguration,
	// 		teachers: userData.teachers ?? [],
	// 		courses: userData.course ?? []
	// 	};
	// });
	return {
		assignments: assignmentProps
	};
};
