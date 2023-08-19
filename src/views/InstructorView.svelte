<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { Add, PersonFavorite, Settings, TwoPersonLift } from 'carbon-icons-svelte';
	import type { Route } from '../libs/types';
	import AppBarLayout from '../layouts/AppBarLayout.svelte';
	import AppRailLayout from '../layouts/AppRailLayout.svelte';
	import SideRailLayout from '../layouts/SideRailLayout.svelte';
	import InstuctorEditor from '../components/InstuctorEditor.svelte';

	const routeMenus: Route[] = [
		{
			carbonIcon: {
				icon: Add,
				size: 24
			},
			label: 'Instructor Editor',
			name: 'instructor-editor-action'
		},
		{
			carbonIcon: {
				icon: TwoPersonLift,
				size: 24
			},
			label: 'Instructors',
			name: 'instructor-list'
		}
	];

	let currentTile: number = 0;
	let headers = ['Instructor Editor', 'Instructor List'];
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail background="bg-surface-600" class="shadow-lg ring-8 ring-primary-400">
			<svelte:fragment slot="lead">
				<AppRailAnchor>
					<div class="grid place-items-center">
						<Settings size="22" />
					</div>
				</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			{#each routeMenus as menu}
				<AppRailTile bind:group={currentTile} name={menu.name} value={0} title={menu.label}>
					<svelte:fragment slot="lead">
						<div class="flex justify-center">
							<svelte:component this={menu.carbonIcon.icon} size={menu.carbonIcon.size} />
						</div>
					</svelte:fragment>
					<span>{menu.label}</span>
				</AppRailTile>
			{/each}
			<!-- --- -->
		</AppRail>
	</svelte:fragment>

	<div class="container my-10 text-sm md:text-xl space-y-6 primary-font">
		<h2 class="text-white text-2xl font-extrabold">{headers[currentTile]}</h2>
		<hr />

		{#if currentTile === 0}
			<InstuctorEditor />
		{:else if currentTile === 1}
			<!-- else if content here -->
		{:else}
			<!-- else content here -->
		{/if}
	</div>
</AppShell>
