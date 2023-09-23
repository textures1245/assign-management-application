<script lang="ts">
	import AssignmentCard from '../../components/AssignmentCard.svelte';
	import type { PageData } from './$types';
	import StateNotFound from '../../components/StateNotFound.svelte';
	import { assignmentPropState, type AssignmentProp } from '$lib/state/assignmentStore';
	import { onDestroy } from 'svelte';
	// Subscribe to the writable store to get the data

	export let data: PageData;
	const assignments = assignmentPropState;
	// Optional: You can convert the assignments store to an array if needed
	let assignmentsArray: AssignmentProp[] = [];
	const unsubscribe = assignments.subscribe((value) => {
		assignmentsArray = [...value];
	});

	// Don't forget to unsubscribe when the component is destroyed
	onDestroy(() => {
		unsubscribe();
	});
	// console.log(assignmentsArray);
</script>

<div class="flex flex-col gap-4">
	{#each data.assignmentProps as assignment}
		<AssignmentCard assignmentProp={assignment} />
	{/each}
</div>
<!-- content here -->
<!-- else content here -->
<div class="grid h-full place-content-center place-self-center grid-cols-1 gap-10 lg:grid-cols-5">
	<div class="col-span-3 z-10">
		<StateNotFound text={"You don't have any courses right now, Try to add one"} />
	</div>
	<div class="grid absolute lg:relative place-self-center col-span-2">
		<lottie-player
			src="https://lottie.host/d1f92fd9-2d53-4d43-b2e3-ee9cd8ddaea4/leyqFTw9so.json"
			background="transparent"
			speed="1"
			style="width: 300px; height: 300px;"
			loop
			class="trasfrom rotate-90"
			autoplay
		/>
	</div>
</div>
