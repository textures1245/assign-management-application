import type { ChartConfiguration, ChartData } from 'chart.js';
export function initialChartConfig(
	chartType: string,
	data: ChartData,
	options: Record<string, any>
): ChartConfiguration {
	return <ChartConfiguration>{
		type: chartType,
		data: data,
		options: options
	};
}
