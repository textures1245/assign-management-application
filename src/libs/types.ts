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
	path: string;
};

//-interface
export interface CourseMenuInterface {
	courseId: string;
	imgSrc: string;
	label: string;
	detail?: string;
}
