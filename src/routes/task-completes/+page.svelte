<script lang="ts">
	import AssignmentCard from '../../components/AssignmentCard.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<div class="flex flex-col gap-4">
	{#each data.assignments as assignment}
		<AssignmentCard {assignment} />
	{/each}
</div>
