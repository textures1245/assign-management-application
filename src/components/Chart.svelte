<script context="module" lang="ts">
</script>

<script lang="ts">
	import Chart, { type ChartConfiguration } from 'chart.js/auto';
	import { onMount } from 'svelte';

	let chart: HTMLCanvasElement;

	export let config: ChartConfiguration;
	export let size = {
		width: 300,
		height: 400
	};
	onMount(() => {
		const ctx = chart.getContext('2d');

		// Initialize chart using default config set
		var myChart = new Chart(ctx!, config);
	});
</script>

<!-- The canvas element -->
<div class="flex place-self-center">
	<canvas bind:this={chart} width={size.width} height={size.height} />
</div>
