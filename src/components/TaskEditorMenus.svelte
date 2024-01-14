<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { assignmentStates } from '$lib/state/assignmentStore';
	import { RowDelete, EditOff, Add } from 'carbon-icons-svelte';

	function onUpdate(taskId: string) {
		const baseUrl = new URL($page.url);
		baseUrl.searchParams.set('onUpdateId', taskId);
		goto(`/task-editor?${baseUrl.searchParams.toString()}`);
	}
</script>

<section class="flex flex-col md:flex-row gap-2 justify-between">
	<div class="flex gap-2 items-center">
		<span class="chip p-2 variant-filled-secondary w-full">Number Of Assignment </span>
		|
		<span class="chip px-3 variant-filled-success w-full"> {$assignmentStates.length} </span>
	</div>
	<a href="/task-editor" class="chip variant-filled-primary p-2">
		Add New Assignment <Add />
	</a>
</section>

<!-- Responsive Container (recommended) -->
<div class="table-container text-sm">
	<!-- Native Table Element -->
	{#if $assignmentStates.length < 0}
		<table class="table table-hover">
			<p class="text-lg p-10 text-center">State not found</p>
		</table>
	{:else}
		<table class="table table-hover">
			<thead>
				<tr class="bg-primary-900">
					<th>Title</th>
					<th>Description</th>
					<th>Priority</th>
					<th>Status</th>
					<th>Score</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each $assignmentStates as a, i}
					<tr>
						<td class="px-auto">{a.title}</td>
						<td class="px-auto">{a.description}</td>
						<td class="my-auto">{a.priority}</td>
						<td class=" my-auto">{!a.isCompleted ? 'Done' : 'Not Done'}</td>
						<td class="my-auto">{a.score ?? '0'}</td>
						<td class="space-y-2"
						><button on:click={() => onUpdate(a.id)} class="chip variant-filled-secondary w-20"
							><RowDelete /> Edit
						</button> <br />
					</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr class="bg-secondary-900" />
			</tfoot>
		</table>
	{/if}
</div>
