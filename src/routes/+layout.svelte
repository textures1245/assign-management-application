<script lang="ts">
	import { page } from '$app/stores';
	import './../app.scss';
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import { AppShell } from '@skeletonlabs/skeleton';
	import AppBarLayout from '../layouts/AppBarLayout.svelte';
	import AppRailLayout from '../layouts/AppRailLayout.svelte';
	import SideRailLayout from '../layouts/SideRailLayout.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<!-- <DrawerLayout /> -->
{#if $page.url.pathname !== '/account'}
	<AppShell>
		<svelte:fragment slot="header">
			<AppBarLayout user={data.user} />
		</svelte:fragment>
		<svelte:fragment slot="sidebarLeft">
			<SideRailLayout />
		</svelte:fragment>
		<svelte:fragment slot="sidebarRight">
			<AppRailLayout />
		</svelte:fragment>

		<div class="flex bg-surface-900 h-full place-content-center">
			<div class="container my-10 primary-font">
				<slot />
			</div>
		</div>

		<!-- (sidebarRight) -->
		<!-- (pageHeader) -->

		<!-- Router Slot -->
		<!-- ---- / ---- -->
		<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
		<!-- (footer) -->
	</AppShell>
{:else}
	<slot />
{/if}
