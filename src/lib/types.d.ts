import type { CarbonIcon, Course } from 'carbon-icons-svelte';
import type { Prisma } from 'prisma';
import m from 'moment';
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
export interface IAccountUser {
	name: string;
	id: string; // Unique identifier for the user
	username: string; // User's username
	email: string; // User's email address
	created: number;
	updated: number;
}
export interface IWebpageConfig {
	configId: string;
}

export interface ICourse {
	courseId: string;
	courseCode: string;
	teacherId: string;
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
//covert ICourse to z.object
export const courseSchema = z.object({
	courseId: z.string(),
	teacherId: z.string(),
	courseCode: z.string(),
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

export interface IAssignment {
	assignmentId: string;
	teacherId: string;
	courseId: string; // The ID of the course to which this assignment belongs
	title: string;
	description: string;
	deadline: Date;
	priority: 'MOST' | 'DECENT' | 'LOW';
	isCompleted: boolean;
	curd: {
		created: Date;
		updated: Date;
		deleted: Date;
	};
	fileAttached?: File | File[];
	score?: number; // Optional property for the assignment grade
	submissionDetail?: string; // Optional property for the submission details
}
export interface ITeacher {
	teacherId: string;
	name: string;
	curd: {
		created: Date;
		updated: Date;
		deleted: Date;
	};
	imgAvatar?: string;
	info?: string;
	rank?: string;
}

export interface IEnrollment {
	enrollmentId: string; // Unique identifier for the enrollment
	userId: string; // ID of the student who is enrolled
	courseId: string; // ID of the course in which the student is enrolled
	enrollmentDate: number; // Timestamp indicating when the student was enrolled
}

export interface INotification {
	notificationId: string; // Unique identifier for the notification
	userId: string; // ID of the user who receives the notification
	message: string; // The content of the notification message
	timestamp: number; // Timestamp indicating when the notification was created
	isRead: boolean; // Flag to indicate whether the user has read the notification
}

export type AccountUserPayload = Prisma.AccountUserGetPayload<{
	include: {
		id: true;
		name: true;
		courses: true;
		teachers: true;
		assignments: true;
		enrollments: true;
		email: true;
	};
}>;

const AccountUserSchema = z.object({
	userId: z.string().nonempty(), // Unique identifier for the user
	username: z.string().nonempty(), // User's username
	email: z.string().email(), // User's email address
	password: z.string(), // User's hashed password
	created: z.number() // Timestamp representing when the user was created
});

export type AccountUser = z.infer<typeof AccountUserSchema>;

// Zod object for ICourse interface

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
