<script lang="ts">
	import './../app.scss';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import AppBarLayout from '../layouts/AppBarLayout.svelte';
	import AppRailLayout from '../layouts/AppRailLayout.svelte';
	import SideRailLayout from '../layouts/SideRailLayout.svelte';
	import DrawerLayout from '../layouts/DrawerLayout.svelte';
</script>


<!-- <DrawerLayout /> -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBarLayout />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<AppRailLayout />
	</svelte:fragment>
	<SideRailLayout />
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>
