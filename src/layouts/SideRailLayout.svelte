<script lang="ts" context="module">
	import { writable } from 'svelte/store';
	export const openSideRail = writable(true);
</script>

<script lang="ts">
	import { courseMenuLeads } from './states/layoutState';
	import { AppRail, AppRailAnchor, AppRailTile, Avatar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { courseStates } from '$lib/state/courseStore';
	let currentTile: number = 0;
</script>

{#if $openSideRail}
	<!-- content here -->
	<AppRail
		spacing="space-x-3"
		active="bg-tertiary-400 rounded-xl"
		class="text-surface-100 "
		background="bg-surface-900"
	>
		<svelte:fragment slot="lead">
			{#each $courseMenuLeads as leadMenu}
				<div class={$page.url.pathname === `/${leadMenu.name}` ? 'bg-secondary-800' : ''}>
					<AppRailAnchor active="bg-surface-600" href={`${leadMenu.path}`}>
						<div class="flex justify-center">
							<svelte:component this={leadMenu.carbonIcon.icon} size={leadMenu.carbonIcon.size} />
						</div>
					</AppRailAnchor>
				</div>
			{/each}
		</svelte:fragment>
		<!-- --- -->
		{#each $courseStates as course, i (course.id)}
			<AppRailTile
				class="flex p-1"
				bind:group={currentTile}
				name={course.label}
				value={i}
				title={course.label}
			>
				<svelte:fragment slot="lead">
					<a href={`/course-view/${course.id}`}>
						<div class="flex justify-center">
							<Avatar
								src={course.imgSrc}
								width="w-14"
								rounded={$page.url.pathname === `/course-view/${course.id}` ? 'rounded-md' : 'rounded-full'}
								class="expand-image-hover-animation"
							/>
						</div>
					</a>
				</svelte:fragment>
			</AppRailTile>
		{/each}
		<!-- --- -->
		<svelte:fragment slot="trail">
			<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
		</svelte:fragment>
	</AppRail>
{/if}
