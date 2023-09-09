<script lang="ts">
	import { AppRail, AppRailAnchor, AppRailTile, AppShell } from '@skeletonlabs/skeleton';
	import { Course, FolderAdd, GroupAccess, TagEdit, TagGroup } from 'carbon-icons-svelte';
	import type { Route } from '$lib/types';
	import GroupEditor from '../components/GroupEditor.svelte';
	import CourseEditorMenus from '../components/CourseEditorMenus.svelte';

	const routeMenus: Route[] = [
		{
			carbonIcon: {
				icon: FolderAdd,
				size: 24
			},
			label: 'Instructor Editor',
			name: 'instructor-editor-action'
		},
		{
			carbonIcon: {
				icon: TagEdit,
				size: 24
			},
			label: 'Group/Tag Editor',
			name: 'group-editor-action'
		}
	];

	let headers = ['Course Editor Config', 'Group / Tag Editor'];
	$: currentTile = 0;
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail background="bg-surface-600" class="shadow-lg ring-8 ring-primary-400">
			<svelte:fragment slot="lead">
				<AppRailAnchor>
					<div class="grid place-items-center">
						<Course size="22" />
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
			<CourseEditorMenus />
		{:else if currentTile === 1}
			<GroupEditor />
		{:else}
			<!-- else content here -->
		{/if}
	</div>
</AppShell>
