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
	imgSrc: string;
	label: string;
	curd: {
		created: Date;
		updated: Date;
		deleted: Date;
	};
	detail?: string;
	group?: string[];
}

interface Assignment {
	assignmentId: number;
	title: string;
	description: string;
	courseId: number; // The ID of the course to which this assignment belongs
	deadline: Date;
	priority: 'MOST' | 'DECENT' | 'LOW'[];
	isCompleted: boolean;
	curd: {
		created: Date;
		updated: Date;
		deleted: Date;
	};
	fileAttached?: File | File[];
	grade?: number; // Optional property for the assignment grade
	submission?: string; // Optional property for the submission details
}
