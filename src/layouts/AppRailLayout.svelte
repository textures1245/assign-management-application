<script lang="ts">
	import type { courseSchema } from '$lib/types';
	import { AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';

	import DrawerLayout from '../components/slots/DrawerApp.svelte';
	import { openDrawerObs } from './states/layoutState';
	import { appRoutes } from './states/layoutState';

	import type { SuperForm } from 'sveltekit-superforms/client';

	let currentTile: number = 0;
</script>

<AppRail active={''} class="text-surface-100 hidden md:block !z-10" background="bg-gradient-to-l to-secondary-800 from-secondary-900">
	<!-- --- -->
	{#each $appRoutes as route, i}
		<AppRailTile
			on:click={() => openDrawerObs.set({ open: true, drawerId: route.name })}
			class="flex !z-20"
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
