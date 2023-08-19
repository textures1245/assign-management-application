<script lang="ts">
	import AssignmentCard from '../../components/AssignmentCard.svelte';
	import type { PageData } from './$types';
	import StateNotFound from '../../components/StateNotFound.svelte';
	export let data: PageData;
</script>

<div class="flex flex-col gap-4">
	{#each data.assignments as assignment}
		<AssignmentCard {assignment} />
	{:else}
		<StateNotFound text={"You don't have any assignments right now. Great Job!"}>
			<div slot="icon">
				<lottie-player
					src="https://lottie.host/52e556bb-2a07-48c0-8a48-9e856de62d91/7T0tlxpdfJ.json"
					background="transparent"
					speed="1"
					style="width: 300px; height: 300px;"
					autoplay
				/>
			</div>
		</StateNotFound>
	{/each}
</div>
