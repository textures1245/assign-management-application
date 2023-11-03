<script lang="ts">
	import type { IAssignment } from '$lib/types';

	export let data: IAssignment[];
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container w-full">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr
				><th />
				<th>Recent done assignments</th>
				<th>Completed</th>
			</tr>
		</thead>
		<tbody>
			{#each data as assign, i}
				<tr>
					<td>{i + 1}</td>
					<td>{assign.title}</td>
					<td>{assign.updated ? assign.updated : new Date().toDateString()}</td>
				</tr>
			{:else}
				<tr>
					<td colspan="3" class="text-center">No data</td>
				</tr>
			{/each}
		</tbody>
		<tfoot />
	</table>
</div>
