<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { Add, PersonFavorite, Settings, TwoPersonLift } from 'carbon-icons-svelte';
	import type { Route } from '$lib/types';
	import InstuctorEditorMenus from '../components/InstuctorEditorMenus.svelte';

	const routeMenus: Route[] = [
		{
			carbonIcon: {
				icon: TwoPersonLift,
				size: 24
			},
			label: 'Instructors',
			name: 'instructor-list'
		}
	];

	let headers = ['Instructor Editor', 'Instructor List'];
	$: currentTile = 0;
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail
			background="to-60% bg-gradient-to-br from-surface-500"
			class="shadow-lg ring-8 ring-primary-400"
		>
			<svelte:fragment slot="lead">
				<AppRailAnchor>
					<div class="grid place-items-center">
						<Settings size="22" />
					</div>
				</AppRailAnchor>
			</svelte:fragment>
			<!-- --- -->
			{#each routeMenus as menu, i}
				<AppRailTile bind:group={currentTile} name={menu.name} value={i} title={menu.label}>
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
			<InstuctorEditorMenus />
		{/if}
	</div>
</AppShell>
