<script lang="ts">
	import { Stepper } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import { slide } from 'svelte/transition';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}

	export let pathname: string;
	export let formName: string;
	let showDebug = false;

	$: isEditor = $page.url.pathname !== `/${pathname}`;
</script>

<div class="space-y-5">
	<section class="flex gap-6 justify-center items-center">
		<h1 class="chip variant-outline-primary text-lg font-bold">
			{isEditor ? `${formName} Editor` : `Add New ${formName}`}
		</h1>
		<hr class="flex-grow h-1 bg-black" />
		<button on:click={() => (showDebug = !showDebug)} class="chip variant-filled-tertiary text-md"
			>Debug</button
		>
	</section>

	<div class="grid gap-4 xl:grid-cols-2">
		{#if showDebug}
			<div transition:slide class="order-none xl:order-1">
				<slot name="superDebugSlot" />
			</div>
		{/if}

		<!-- write button with tailwind classes -->

		<div class:col-span-full={!showDebug} class="card p-10 text-white">
			<Stepper buttonCompleteType={'submit'} on:step={onStepHandler}>
				<slot name="form" />
			</Stepper>
		</div>
	</div>
</div>
