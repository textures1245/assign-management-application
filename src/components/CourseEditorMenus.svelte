<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import { courseStates } from '$lib/state/courseStore';
	import { RowDelete, EditOff, Add } from 'carbon-icons-svelte';
</script>

<section class="flex flex-col md:flex-row gap-2 justify-between">
	<div class="flex gap-2 items-center">
		<span class="chip p-2 variant-filled-secondary w-full">Amount of Courses</span>
		|
		<span class="chip px-3 variant-filled-success w-full"> {courseStates.length} </span>
	</div>
	<a href="/course-editor" class="chip variant-filled-primary p-2">
		Add New Course <Add />
	</a>
</section>
<div class="table-container text-sm">
	<!-- Native Table Element -->
	{#if courseStates.length < 0}
		<table class="table table-hover">
			<p class="text-lg p-10 text-center">State not found</p>
		</table>
	{:else}
		<table class="table table-hover">
			<thead>
				<tr class="bg-primary-900">
					<th>Course</th>
					<th>Code</th>
					<th>Detail</th>
					<th>Action</th>
				</tr>
			</thead>
			<tbody>
				{#each courseStates as c, i}
					<tr>
						<td class="h-full px-auto">{c.label}</td>
						<td class="my-auto">{c.courseCode ?? '-'}</td>
						<td class="my-auto">{c.detail ?? '-'}</td>
						<td class="space-y-2"
							><span class="chip variant-filled-secondary w-20"><RowDelete /> Edit </span> <br />
							<span class="chip variant-filled-error w-20"><EditOff /> Delete</span>
						</td>
					</tr>
				{/each}
			</tbody>
			<tfoot />
		</table>
	{/if}
</div>
