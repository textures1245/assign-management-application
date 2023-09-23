<script lang="ts">
	import type { PopupSettings } from '@skeletonlabs/skeleton';
	import { AppBar, Avatar } from '@skeletonlabs/skeleton';
	import { Workspace } from 'carbon-icons-svelte';
	import { panelGroup } from './states/layoutState';
	import { popupFeatured } from '../components/slots/popupConfig';
	import { openSideRail } from './SideRailLayout.svelte';
	import type { IAccountUser } from '$lib/types';
	let config = {
		appName: 'Assign Management'
	};

	const popupResponse = (target: string) => {
		let newPopupConfig: PopupSettings;
		newPopupConfig = { ...popupFeatured, target: target };
		return newPopupConfig;
	};

	export let user: IAccountUser;
</script>

<section class="text-surface-100">
	<!-- write AapBar css glass transparent background with blur filter -->

	<AppBar
		class="border-b border-slate-50/[0.1]"
		background="bg-gradient-to-r via-surface-800 to-secondary-900 from-surface-900 backdrop-filter"
	>
		<svelte:fragment slot="lead">
			<Workspace size={32} />
		</svelte:fragment>
		<span class="text-xl">{config.appName}</span>
		<svelte:fragment slot="trail">
			{#each $panelGroup as panel, i (panel.name)}
				{#if panel.path}
					<a href={panel.path}>
						<svelte:component this={panel.carbonIcon.icon} size={panel.carbonIcon.size} />
					</a>
				{:else if panel.name === 'side-rail-opener'}
					<button on:click={() => openSideRail.set(!$openSideRail)}>
						<svelte:component this={panel.carbonIcon.icon} size={panel.carbonIcon.size} />
					</button>
				{:else}
					<!-- <button use:popup={popupResponse(panel.name)}>
						<svelte:component this={panel.carbonIcon.icon} size={panel.carbonIcon.size} />
					</button> -->
				{/if}
			{/each}
			<div class="chip variant-filled-surface rounded-full">
				<span>{user?.name ?? ''}</span>
				<Avatar
					width="w-8"
					src={'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'}
				/>
			</div>
		</svelte:fragment>
		<!-- <NotificationPopup />
		<MenuPopup /> -->
	</AppBar>
</section>
