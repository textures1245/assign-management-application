import { AssignmentData, type AssignmentDataVisualize } from '../../libs/state/assignmentStore';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const assignmentData = {
		type: 'doughnut',
		data: new AssignmentData(
			[
				{
					label: 'Assignment Data Visualization',
					data: [300, 50, 100],
					backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
					// hoverOffset: 4,
					borderWidth: 0
				}
			],
			['Subject 1', 'Subject 2', 'Subject 3']
		).toPOJO(),
		options: {
			borderRadius: '30',
			responsive: true,
			cutout: '95%',
			spacing: 2,
			plugins: {
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
				},
				title: {
					display: true,
					text: 'Assignment Data Visualization'
				}
			}
		}
	};

	const diaryAssignmentData = {
		type: 'line',
		data: new AssignmentData([
			{
				label: 'Diary Assignment Data Visualization',
				data: [
					{ x: '2016-12-25', y: 20 },
					{ x: '2016-12-26', y: 10 },
					{ x: '2016-12-26', y: 10 },
					{ x: '2016-12-26', y: 10 },
					{ x: '2016-12-26', y: 10 }
				],
				backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
				// hoverOffset: 4,
				borderWidth: 2
			}
		]).toPOJO(),
		options: {
			borderRadius: '30',
			responsive: true,
			cutout: '95%',
			spacing: 2,
			plugins: {
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
				},
				title: {
					display: true,
					text: 'Diary Assignment Data Visualization'
				}
			}
		}
	};

	const doneAssignmentData = {
		type: 'doughnut',
		data: new AssignmentData(
			[
				{
					label: 'Done Assignment Data Visualization',
					data: [300, 50, 100],
					backgroundColor: ['#7000e1', '#fc8800', '#00b0e8'],
					// hoverOffset: 4,
					borderWidth: 0
				}
			],
			['Subject 1', 'Subject 2', 'Subject 3']
		).toPOJO(),
		options: {
			borderRadius: '30',
			responsive: true,
			cutout: '95%',
			spacing: 2,
			plugins: {
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
				},
				title: {
					display: true,
					text: 'Done Assignment Data Visualization'
				}
			}
		}
	};

	return <AssignmentDataVisualize>{
		assignments: assignmentData,
		doneAssignments: doneAssignmentData,
		diaryProgression: diaryAssignmentData
	};
};