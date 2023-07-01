import type { CarbonIcon } from 'carbon-icons-svelte';
import * as z from 'zod';
export const RouteAppSchema = z.object({
	label: z.string(),
	name: z.string(),
	path: z.string()
});

export type RouteApp = z.infer<typeof RouteAppSchema>;

export type Route = {
	carbonIcon: { icon: typeof CarbonIcon; size: 16 | 20 | 24 | 32; title?: string };
	label: string;
	name: string;
	path: string;
};
