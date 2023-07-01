<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Menu, UserAvatar, Workspace } from 'carbon-icons-svelte';
	import type { Route } from '../libs/types';
	let config = {
		appName: 'Assign Management'
	};

	let panelGroup: Route[] = [
		{
			carbonIcon: {
				icon: Menu,
				size: 24
			},
			label: 'Menu',
			name: 'menuPanel',
			path: '/menu'
		}
		{
			carbonIcon: {
				icon: UserAvatar,
				size: 24
			},
			label: 'Account',
			name: 'accountPanel',
			path: '/account'
		}
	];
</script>

<section class="text-surface-100">
	<AppBar>
		<svelte:fragment slot="lead">
			<Workspace size={32} />
		</svelte:fragment>
		<span class="text-xl">{config.appName}</span>
		<svelte:fragment slot="trail">
			{#each panelGroup as panel}
				<svelte:component this={panel.carbonIcon.icon} size={panel.carbonIcon.size} />
			{/each}
		</svelte:fragment>
	</AppBar>
</section>
