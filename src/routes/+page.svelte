<script lang="ts">
	import { TaskAssetView, TaskApproved, TaskRemove } from 'carbon-icons-svelte';
	import Chart from '../components/Chart.svelte';
	import type { PageData } from './$types';
	import RecentAssignmentTable from '../components/RecentAssigmentTable.svelte';
	import { onMount } from 'svelte';
	import { assignmentStates } from '$lib/state/assignmentStore';
	import { courseStates } from '$lib/state/courseStore';
	import { teacherStates } from '$lib/state/teacherStore';

	export let data: PageData;

	onMount(() => {
		assignmentStates.set(data.userData.assignments ?? []);
		courseStates.set(data.userData.course ?? []);
		teacherStates.set(data.userData.teachers ?? []);
	});
</script>

<section class="flex flex-col gap-10">
	<div id="heading" class="flex flex-col lg:flex-row justify-between gap-5 items-center">
		<article class="prose prose-sm md:prose-md prose-neutral">
			<h1>Dashboard Overview</h1>
			<blockquote class="">Last Online: 21/5/2022</blockquote>
		</article>

		<div class="logo-cloud grid-cols-1 md:grid-cols-3 gap-1">
			<a class="logo-item border-b-2 border-secondary-600 p-10" href="/">
				<TaskAssetView size="28" />
				<div class="flex flex-col gap-1">
					<span class="text-2xl">32</span>
					<span class="text-xs logo-chip">Tasks</span>
				</div>
			</a>
			<a class="logo-item border-b-2 border-success-600" href="/">
				<TaskApproved size="28" />
				<div class="flex flex-col gap-1">
					<span class="text-2xl">16</span>
					<span class="text-xs logo-chip">Complete</span>
				</div>
			</a>
			<a class="logo-item border-b-2 border-error-600" href="/">
				<TaskRemove size="28" />
				<div class="flex flex-col gap-1">
					<span class="text-2xl">16</span>
					<span class="text-xs logo-chip">Incomplete</span>
				</div>
			</a>
			<!-- ... -->
		</div>
	</div>
	<hr />
	{#if data.dataset.assignments.data.datasets.length <= 1}
		<section id="chart-container" class="space-y-6">
			<div id="diary-assigment-chart" class="flex justify-center flex-wrap gap-8">
				<div class="chart-card">
					<Chart size={{ width: 600, height: 400 }} config={data.dataset.diaryProgression} />
				</div>
				<div id="recent-assignments-table" class="flex-grow">
					<RecentAssignmentTable
						data={$assignmentStates
							.filter((assign) => assign.isCompleted) // Filter for completed assignments
							.sort((a, b) => {
								const aTime = a.curd.updated?.getTime() ?? 0;
								const bTime = b.curd.updated?.getTime() ?? 0;
								return bTime - aTime;
							})
							.slice(0, 5)}
					/>
				</div>
			</div>
			<div class="grid md:grid-cols-2 gap-8">
				<div id="assignment-chart" class="chart-card flex justify-center">
					<Chart config={data.dataset.assignments} />
				</div>
				<div>
					<div id="done-assigment-chart" class="chart-card flex justify-center">
						<Chart config={data.dataset.doneAssignments} />
					</div>
				</div>
			</div>
		</section>
	{:else}
		<div class="flex flex-col place-items-center">
			<h1 class="text-md md:text-2xl text-center font-extrabold">
				You don't have any assignments, So we can't analyzed data for you
			</h1>
			<script
				src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
			></script>

			<lottie-player
				src="https://lottie.host/b8f5c0d5-4bde-432b-ba4f-3be4d3af7941/oS09xwokQp.json"
				background="transparent"
				speed="1"
				style="width: 300px; height: 300px;"
				loop
				autoplay
			/>
		</div>
	{/if}
</section>

<style lang="postcss">
	* {
		@apply !text-surface-100;
	}

	#chart-container {
	}

	.chart-card {
		@apply card p-4;
	}

	.logo-chip {
		@apply chip variant-outline-surface p-1 rounded-md;
	}
</style>
