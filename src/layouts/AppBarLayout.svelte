<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { Workspace } from 'carbon-icons-svelte';
	import { panelGroup } from './states/layoutState';
	import NotificationPopup from '../components/slots/์NotificationPopup.svelte';
	import MenuPopup from '../components/slots/MenuPopup.svelte';
	import { popupFeatured } from '../components/slots/popupConfig';
	let config = {
		appName: 'Assign Management'
	};

	const popupResponse = (target: string) => {
		let newPopupConfig: PopupSettings;
		newPopupConfig = { ...popupFeatured, target: target };
		return newPopupConfig;
	};
</script>

<section class="text-surface-100">
	<AppBar>
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
				{:else}
					<button use:popup={popupResponse(panel.name)}>
						<svelte:component this={panel.carbonIcon.icon} size={panel.carbonIcon.size} />
					</button>
				{/if}
			{/each}
		</svelte:fragment>
		<NotificationPopup />
		<MenuPopup />
	</AppBar>
</section>
