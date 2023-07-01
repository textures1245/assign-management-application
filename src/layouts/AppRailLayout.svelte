<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
	import { Settings, Book, Person } from 'carbon-icons-svelte';
	import type { Route } from '../libs/types';
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

<AppRail class="text-surface-100">
	<svelte:fragment slot="lead">
		<AppRailAnchor href="/">(icon)</AppRailAnchor>
	</svelte:fragment>
	<!-- --- -->
	{#each mainRoute as route, i}
		<AppRailTile
			class="flex"
			bind:group={currentTile}
			name={route.name}
			value={i}
			title={route.label}
		>
			<svelte:fragment slot="lead">
				<div class="flex justify-center">
					<svelte:component this={route.carbonIcon.icon} size={route.carbonIcon.size} />
				</div>
			</svelte:fragment>

			<span>{route.label}</span>
		</AppRailTile>
	{/each}
	<!-- --- -->
	<svelte:fragment slot="trail">
		<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
	</svelte:fragment>
</AppRail>
