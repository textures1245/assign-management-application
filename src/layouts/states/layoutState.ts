import { type Readable, readable, writable } from 'svelte/store';
import type { Route } from '../../libs/types';
import {
	Menu,
	UserAvatar,
	Settings,
	Person,
	ExpandAll,
	TaskComplete,
	Home,
	TaskSettings,
	Notification
} from 'carbon-icons-svelte';
export const openDrawerObs = writable({ open: false, drawerId: '' });

export const panelGroup: Readable<Route[]> = readable([
	{
		carbonIcon: {
			icon: Menu,
			size: 24
		},
		label: 'Menu',
		name: 'menu-panel',
	},
	{
		carbonIcon: {
			icon: Notification,
			size: 24
		},
		label: 'Notification',
		name: 'notification-panel',
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
		path: '/overviews'
	},
	{
		carbonIcon: { icon: ExpandAll, size: 24 },
		label: 'Feeds',
		name: 'course-feeds',
		path: '/course-feed-list'
	},
	{
		carbonIcon: { icon: TaskComplete, size: 24 },
		label: 'Task Completes',
		name: 'task-completes',
		path: '/task-complete-list'
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
		path: '/instructors'
	},
	{
		carbonIcon: { icon: TaskSettings, size: 24 },
		label: 'Create Task',
		name: 'task-creator-route-app',
		path: '/task-creator'
	}
]);
