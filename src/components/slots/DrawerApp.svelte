<script lang="ts">
	import SettingView from '../../views/SettingView.svelte';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { openDrawerObs } from '../../layouts/states/layoutState';
	import InstructorView from '../../views/InstructorView.svelte';
	import CourseEditorView from '../../views/CourseEditorView.svelte';
	import TaskEditorView from '../../views/TaskEditorView.svelte';
	const drawerSettings: DrawerSettings = {
		id: 'example-3',
		// Provide your property overrides:
		bgDrawer: 'bg-purple-900 text-white',
		bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-xl'
	};
	openDrawerObs.subscribe((drawer) => {
		if (drawer.open) {
			drawerStore.open();
		}
	});
</script>

<Drawer
	bgDrawer="shadow-none bg-gradient-to-br to-50% from-surface-500"
	class=" backdrop-blur-sm shadow-none   border-gray-100  text-surface-100"
>
	{#if $openDrawerObs.drawerId === 'setting-route-app'}
		<p class="text-white">asdsd</p>
		<SettingView />
	{:else if $openDrawerObs.drawerId === 'instructors-route-app'}
		<InstructorView />
	{:else if $openDrawerObs.drawerId === 'course-creator-route-app'}
		<CourseEditorView />
	{:else if $openDrawerObs.drawerId === 'task-creator-route-app'}
		<TaskEditorView />
	{:else}{/if}
</Drawer>
