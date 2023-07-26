<script lang="ts">
	import Chart, {
		type ChartConfiguration,
		type ChartTypeRegistry,
		type Plugin
	} from 'chart.js/auto';
	import { onMount } from 'svelte';

	interface CenterTextOptions {
		text: string;
		color: string;
		fontStyle: string;
		fontSize: number;
		backgroundColor: string;
	}

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
		const centerTextPlugin: Plugin<keyof ChartTypeRegistry, unknown[]> = {
			id: 'centerText',
			afterDraw: (chart, args, options) => {
				const chartOptions = options as unknown as CenterTextOptions; // Cast options to CenterTextOptions

				if (chartOptions.text) {
					const { ctx, chartArea } = chart;
					const centerX = (chartArea.left + chartArea.right) / 2;
					const centerY = (chartArea.top + chartArea.bottom) / 2;

					ctx.save();
					ctx.textBaseline = 'middle';
					ctx.textAlign = 'center';
					ctx.fillStyle = chartOptions.color;
					ctx.font = `${chartOptions.fontStyle} ${chartOptions.fontSize}px Arial`;
					ctx.fillText(chartOptions.text, centerX, centerY);
					ctx.restore();
				}
			}
		};
		Chart.register(centerTextPlugin);
	});
</script>

<!-- The canvas element -->
<div class="flex place-self-center">
	<div class="chart-container m-2">
		<canvas bind:this={chart} width={size.width} height={size.height} />
	</div>
</div>

<style lang="scss">
	.chart-container {
		position: relative;
	}
</style>
