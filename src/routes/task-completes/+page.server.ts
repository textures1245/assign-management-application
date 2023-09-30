import type { PageServerLoad } from './$types';
import { AssignmentData, type AssignmentProp, Assignment } from '$lib/state/assignmentStore';
import type { ChartConfiguration } from 'chart.js';
import type { AccountUserProp } from '$lib/state/accountUser';
import { fail } from '@sveltejs/kit';
import { DEV_MODE } from '$env/static/private';
import { Teacher } from '../../lib/state/teacherStore';
import { Course } from '../../lib/state/courseStore';
import type { IAssignment, ICourse, ITeacher } from '$lib/types';

function createAssignmentProps(
	assignment: IAssignment | Assignment,
	userData?: AccountUserProp
): AssignmentProp {
	let teacher: ITeacher | null = {} as ITeacher;
	let course: ICourse | null = {} as ICourse;

	const dateDataset = {
		start: assignment.curd.created.getDay(),
		end: assignment.deadline.getDay()
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
		const iTeacher = userData.teachers.find((t) => t.teacherId === assignment.teacherId);
		const iCourse = userData.course.find((c) => c.courseId === assignment.courseId);

		if (iTeacher && iCourse) {
			teacher = new Teacher().objectAssign(iTeacher);
			course = new Course().objectAssign(iCourse);
		}
	} else {
		//- for dev only
		teacher = {
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
		};
		course = {
			courseId: '1',
			courseCode: 'CSE 101',
			teacherId: '1',
			imgSrc: 'https://i.pravatar.cc/300',
			label: 'Introduction to Computer Science',
			curd: {
				created: new Date(),
				updated: new Date(),
				deleted: undefined
			},
			detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
			group: ['Group 1', 'Group 2', 'Group 3']
		};
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

export const load: PageServerLoad = async ({ locals }) => {
	const userData: AccountUserProp = locals.userData;
	if (!userData) throw fail(401, { message: 'Unauthorized' });
	let assignmentProps: AssignmentProp[] = [];

	if (DEV_MODE !== 'true') {
		assignmentProps = userData.assignments.map((a) => {
			return createAssignmentProps(a, userData);
		});
	} else {
		// assignments data mockup
		const assignments: IAssignment[] = [
			{
				assignmentId: '1',
				teacherId: '1',
				courseId: '1',
				title: 'Assignment 1',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
				deadline: new Date(),
				priority: 'MOST',
				isCompleted: false,
				curd: {
					created: new Date(),
					updated: undefined,
					deleted: undefined
				},
				fileAttached: undefined,
				score: undefined,
				submissionDetail: undefined
			},
			{
				assignmentId: '2',
				teacherId: '2',
				courseId: '2',
				title: 'Assignment 2',
				description:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.',
				deadline: new Date(),
				priority: 'DECENT',
				isCompleted: false,
				curd: {
					created: new Date(),
					updated: undefined,
					deleted: undefined
				},
				fileAttached: undefined,
				score: undefined,
				submissionDetail: undefined
			}
		];

		assignmentProps = assignments.map((a) => createAssignmentProps(a));
	}

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
	return { assignmentProps };
};
