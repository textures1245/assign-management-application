<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile, Avatar } from '@skeletonlabs/skeleton';
	import { Settings, Book, Person, ExpandAll } from 'carbon-icons-svelte';
	import type { Route } from '../libs/types';
	import { courseMenuStates } from '../libs/store';
	let currentTile: number = 0;
	let mainRoute: Route[] = [
		{
			carbonIcon: { icon: Settings, size: 24 },
			label: 'Setting',
			name: 'appSetting',
			path: '/setting'
		},
		{
			carbonIcon: { icon: Book, size: 24 },
			label: 'Assignment',
			name: 'appAssignment',
			path: '/assignments'
		},
		{
			carbonIcon: { icon: Person, size: 24 },
			label: 'Instructors',
			name: 'appInstructors',
			path: '/instructors'
		}
	];
</script>

<AppRail
	spacing="space-x-3"
	active="bg-tertiary-400 rounded-3xl"
	class="text-surface-100"
	regionLead="rounded-lg"
	background="bg-tertiary-900"
>
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/">
			<div class="flex justify-center">
				<ExpandAll size={24} />
			</div>
		</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	{#each $courseMenuStates as course, i (course.courseId)}
		<AppRailTile
			class="flex"
			bind:group={currentTile}
			name={course.label}
			value={i}
			title={course.label}
		>
			<svelte:fragment slot="lead">
				<div class="flex justify-center">
					<Avatar src={course.imgSrc} width="w-14" rounded="rounded-full" />
				</div>
			</svelte:fragment>
		</AppRailTile>
	{/each}
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
	</svelte:fragment>
</AppRail>
