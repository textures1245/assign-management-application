<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { teacherStates } from '$lib/state/teacherStore';
	import { RowDelete, EditOff } from 'carbon-icons-svelte';
</script>

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
				<tr class="bg-secondary-900">
					<th class="flex justify-center" colspan="3">Amount of Instructors</th>
					<td colspan="4" class=" text-center"
						><span class="chip variant-filled-secondary w-full">{teacherStates.length}</span>
					</td>
				</tr>
			</tfoot>
		</table>
	{/if}
</div>
