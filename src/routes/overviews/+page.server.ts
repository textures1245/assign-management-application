import { TemperatureMax } from 'carbon-icons-svelte';
import { AssignmentData, type AssignmentDataVisualize } from '$lib/state/assignmentStore';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import type { AccountUserProp } from '$lib/state/accountUser';
import type { IAccountUser } from '$lib/types';

export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });

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
			maintainAspectRatio: true,
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
			aspectRatio: 2,

			spacing: 1,
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

	return {
		user: <IAccountUser>{ ...userData },
		dataset: <AssignmentDataVisualize>{
			assignments: assignmentData,
			doneAssignments: doneAssignmentData,
			diaryProgression: diaryAssignmentData
		}
	};
};
