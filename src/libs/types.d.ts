import type { CarbonIcon } from 'carbon-icons-svelte';
import * as z from 'zod';

export const RouteAppSchema = z.object({
	label: z.string(),
	name: z.string(),
	path: z.string()
});

// export const CourseMenuSchema = z.object({
// 	courseId: z.string(),
// 	imgSrc: z.string(),
// 	label: z.string(),
// 	detail: z.string().optional()
// });

export type RouteApp = z.infer<typeof RouteAppSchema>;

export type Route = {
	carbonIcon: { icon: typeof CarbonIcon; size: 16 | 20 | 24 | 32; title?: string };
	label: string;
	name: string;
	path?: string;
};

//-interface
export interface ICourse {
	courseId: string;
	teacherId: string;
	imgSrc: string;
	label: string;
	curd: {
		created: number | string;
		updated: number | string;
		deleted: number | string;
	};
	detail?: string;
	group?: string[];
}

export interface IAssignment {
	assignmentId: string;
	teacherId: string;
	courseId: string; // The ID of the course to which this assignment belongs
	title: string;
	description: string;
	deadline: number;
	priority: 'MOST' | 'DECENT' | 'LOW';
	isCompleted: boolean;
	curd: {
		created: number;
		updated: number;
		deleted: number;
	};
	fileAttached?: File | File[];
	grade?: number; // Optional property for the assignment grade
	submission?: string; // Optional property for the submission details
}
export interface ITeacher {
	teacherId: string;
	courseId: string;
	name: string;
	curd: {
		created: number;
		updated: number;
		deleted: number;
	};
	imgAvatar?: string;
	info?: string;
	rank?: string;
}
