<script lang="ts">
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import type { AssignmentWithChartData } from '../libs/state/assignmentStore';
	import type { Teacher } from '../libs/state/teacherStore';
	import Chart from './Chart.svelte';
	export let assignment: AssignmentWithChartData;

	let tabSet: number = 0;
</script>

<TabGroup
	class="primary-thai-font bg-tertiary-200 shadow-lg  border-r-8 border-b-4 border-surface-400  p-4  rounded-xl"
>
	<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab1" value={0}>
		<svelte:fragment slot="lead" />
		<span>Overview</span>
	</Tab>
	<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab2" value={1}>Detail</Tab>
	<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab3" value={2}>Deadline</Tab>
	<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab3" value={3}>File Attaches</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		<div class="grid md:grid-cols-5 gap-y-6 lg:grid-cols-7">
			<div class="md:col-span-2 flex place-content-center lg:grid-cols-2">
				<Chart config={assignment.config} />
			</div>
			<div class="md:col-span-2 lg:grid-cols-2">
				{#if tabSet === 0}
					<article class="prose prose-sm">
						<h2 class="underline underline-offset-4">{assignment.title}</h2>
						<blockquote>{assignment.description}</blockquote>
					</article>
				{:else if tabSet === 1}
					(tab panel 2 contents)
				{:else if tabSet === 2}
					(tab panel 3 contents)
				{:else if tabSet === 3}{/if}
			</div>
		</div>
	</svelte:fragment>
</TabGroup>
