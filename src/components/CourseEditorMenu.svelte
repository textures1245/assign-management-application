<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
    import { courseStates } from '../libs/state/courseStore';
    import { RowDelete, EditOff } from 'carbon-icons-svelte';

    const cStates = courseStates
</script>

<div class="table-container text-sm">
	<!-- Native Table Element -->
	{#if cStates.length < 0}
		<table class="table table-hover">
			<p class="text-lg p-10 text-center">State not found</p>
		</table>
	{:else}
		<table class="table table-hover">
			<thead>
				<tr class="bg-primary-900">
					<th>Course</th>
					<th>Rank</th>
					<th>About</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each !cStates as c, i (c.courseId)}
					<tr>
					
						<td class="h-full px-auto">{c.label}</td>
						<td class="my-auto">{c.label ?? '-'}</td>
						<td class="my-auto">{c. ?? '-'}</td>
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
