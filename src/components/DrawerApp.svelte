<script lang="ts">
	import type { SuperForm } from 'sveltekit-superforms/client';
	import SettingView from '../views/SettingView.svelte';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	import { openDrawerObs } from '../layouts/states/layoutState';
	import InstructorView from '../views/InstructorView.svelte';
	import CourseEditorView from '../views/CourseEditorView.svelte';
	import type { courseSchema } from '../libs/types';
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

	export let courseValidator: SuperForm<typeof courseSchema>;
</script>

<Drawer
	bgBackdrop=""
	bgDrawer="bg-surface-500/80"
	class=" backdrop-blur-sm   border-gray-100  text-surface-100"
>
	{#if $openDrawerObs.drawerId === 'setting-route-app'}
		<p class="text-white">asdsd</p>
		<SettingView />
	{:else if $openDrawerObs.drawerId === 'instructors-route-app'}
		<InstructorView />
	{:else if $openDrawerObs.drawerId === 'course-creator-route-app'}
		<CourseEditorView {courseValidator} />
		<!-- (show 'example-2' contents) -->
	{:else}{/if}
</Drawer>
