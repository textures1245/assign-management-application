import { type Readable, readable, writable } from 'svelte/store';
import type { Route } from '$lib/types';
import {
	Course,
	Menu,
	UserAvatar,
	Settings,
	Person,
	ExpandAll,
	TaskComplete,
	Home,
	TaskSettings,
	Notification,
	OpenPanelLeft
} from 'carbon-icons-svelte';
export const openDrawerObs = writable({ open: false, drawerId: '' });

export const panelGroup: Readable<Route[]> = readable([
	{
		carbonIcon: {
			icon: OpenPanelLeft,
			size: 24
		},
		label: 'SideRail',
		name: 'side-rail-opener'
	},
	{
		carbonIcon: {
			icon: Menu,
			size: 24
		},
		label: 'Menu',
		name: 'menu-panel'
	},
	{
		carbonIcon: {
			icon: Notification,
			size: 24
		},
		label: 'Notification',
		name: 'notification-panel'
	},
	{
		carbonIcon: {
			icon: UserAvatar,
			size: 24
		},
		label: 'Account',
		name: 'account-panel',
		path: '/account'
	}
]);

export const courseMenuLeads: Readable<Route[]> = readable([
	{
		carbonIcon: { icon: Home, size: 24 },
		label: 'Overview',
		name: 'overviews',
		path: '/'
	},
	{
		carbonIcon: { icon: ExpandAll, size: 24 },
		label: 'Feeds',
		name: 'course-feeds',
		path: '/course-feeds'
	},
	{
		carbonIcon: { icon: TaskComplete, size: 24 },
		label: 'Task Completes',
		name: 'task-completes',
		path: '/task-completes'
	}
]);

export const appRoutes: Readable<Route[]> = readable([
	{
		carbonIcon: { icon: Settings, size: 24 },
		label: 'Setting',
		name: 'setting-route-app',
		path: '/setting'
	},
	{
		carbonIcon: { icon: Person, size: 24 },
		label: 'Instructors',
		name: 'instructors-route-app',
		path: '/instructor-editor'
	},
	{
		carbonIcon: { icon: TaskSettings, size: 24 },
		label: 'Create Task',
		name: 'task-creator-route-app',
		path: '/task-editor'
	},
	{
		carbonIcon: { icon: Course, size: 24 },
		label: 'Create Course',
		name: 'course-creator-route-app',
		path: '/course-editor'
	}
]);
