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

// Zod object for ICourse interface
export const courseSchema = z.object({
	courseId: z.string(),
	teacherId: z.string(),
	imgSrc: z.string(),
	label: z.string(),
	curd: z.object({
		created: z.union([z.number(), z.string()]),
		updated: z.union([z.number(), z.string()]),
		deleted: z.union([z.number(), z.string()])
	}),
	detail: z.string().optional(),
	group: z.array(z.string()).optional()
});

// Zod object for IAssignment interface
export const assignmentSchema = z.object({
	assignmentId: z.string(),
	teacherId: z.string(),
	courseId: z.string(),
	title: z.string(),
	description: z.string(),
	deadline: z.number(),
	priority: z.enum(['MOST', 'DECENT', 'LOW']),
	isCompleted: z.boolean(),
	curd: z.object({
		created: z.number(),
		updated: z.number(),
		deleted: z.number()
	}),
	fileAttached: z.union([z.instanceof(File), z.array(z.instanceof(File))]).optional(),
	grade: z.number().optional(),
	submission: z.string().optional()
});

// Zod object for ITeacher interface
export const teacherSchema = z.object({
	teacherId: z.string(),
	courseId: z.string(),
	name: z.string(),
	curd: z.object({
		created: z.number(),
		updated: z.number(),
		deleted: z.number()
	}),
	imgAvatar: z.string().optional(),
	info: z.string().optional(),
	rank: z.string().optional()
});
