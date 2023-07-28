<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';

	import DrawerLayout from '../components/DrawerApp.svelte';
	import { openDrawerObs } from './states/layoutState';
	import { appRoutes } from './states/layoutState';

	let currentTile: number = 0;
</script>

<AppRail active={''} class="text-surface-100 hidden md:block" background="bg-surface-900">
	<!-- --- -->
	{#each $appRoutes as route, i}
		<AppRailTile
			on:click={() => openDrawerObs.set({ open: true, drawerId: route.name })}
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
<DrawerLayout />
