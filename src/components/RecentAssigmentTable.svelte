<script lang="ts">
	import type { Assignment } from '$lib/state/assignmentStore';

	export let data: Assignment[];
</script>

<!-- Responsive Container (recommended) -->
<div class="table-container w-full">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>
				<th />
				<th>Title</th>
				<th>Completed</th>
			</tr>
		</thead>
		<tbody>
			{#each data as assign, i}
				<tr>
					<td>{i + 1}</td>
					<td>{assign.title}</td>
					<td>{assign.curd.updated.toDateString() ?? new Date().toDateString()}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot />
	</table>
</div>
