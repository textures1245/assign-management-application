<script lang="ts">
	import './../app.scss';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import AppBarLayout from '../layouts/AppBarLayout.svelte';
	import AppRailLayout from '../layouts/AppRailLayout.svelte';
	import SideRailLayout from '../layouts/SideRailLayout.svelte';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<!-- <DrawerLayout /> -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBarLayout />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<SideRailLayout />
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<AppRailLayout />
		<section class="invisible md:visible">
		</section>
	</svelte:fragment>

	<div class="flex place-content-center">
		<div class="container my-10 primary-font">
			<slot />
		</div>
	</div>

	.

	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->

	<!-- Router Slot -->
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>
