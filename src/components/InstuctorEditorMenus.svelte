<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { teacherStates } from '$lib/state/teacherStore';
	import { RowDelete, EditOff, Add } from 'carbon-icons-svelte';
</script>

<section class="flex flex-col md:flex-row gap-2 justify-between">
	<div class="flex gap-2 items-center">
		<span class="chip p-2 variant-filled-secondary w-full">Number Of Teachers </span>
		|
		<span class="chip px-3 variant-filled-success w-full"> {teacherStates.length} </span>
	</div>
	<a href="instructor-editor" class="chip variant-filled-primary p-2">
		Add New Teacher <Add />
	</a>
</section>

<!-- Responsive Container (recommended) -->
<div class="table-container text-sm">
	<!-- Native Table Element -->
	{#if teacherStates.length < 0}
		<table class="table table-hover">
			<p class="text-lg p-10 text-center">State not found</p>
		</table>
	{:else}
		<table class="table table-hover">
			<thead>
				<tr class="bg-primary-900">
					<th />
					<th>Name</th>
					<th>Rank</th>
					<th>About</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each teacherStates as t, i (t.teacherId)}
					<tr>
						<td class="grid place-content-center">
							<Avatar src={t.imgAvatar} width="w-12" />
						</td>
						<td class="h-full px-auto">{t.name}</td>
						<td class="my-auto">{t.rank ?? '-'}</td>
						<td class="my-auto">{t.info ?? '-'}</td>
						<td class="space-y-2"
							><span class="chip variant-filled-secondary w-20"><RowDelete /> Edit </span> <br />
							<span class="chip variant-filled-error w-20"><EditOff /> Delete</span>
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
