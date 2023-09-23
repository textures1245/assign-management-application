<script lang="ts">
	import { TabGroup, Tab, TabAnchor, Avatar } from '@skeletonlabs/skeleton';
	import Datepicker from 'svelte-calendar-resurrected';
	import Chart from './Chart.svelte';
	import type { AssignmentProp } from '$lib/state/assignmentStore';
	import dayjs from 'dayjs';
	export let assignmentProp: AssignmentProp;

	const prefixConfig = {
		overview: {
			course: 'รายวิชา: ',
			courseCode: 'รหัสรายวิชา: ',
			taughtBy: 'อาจาร์ยผู้สอน: '
		}
	};
	let dateFormat = '#{l}, #{F} #{j}, #{Y}';

	const today = new Date();
	const tomorrow = dayjs().add(1, 'day').toDate();
	let tabSet: number = 0;
</script>

<TabGroup
	class="primary-thai-font bg-surface-500 text-white shadow-surface-lg   border-r-8 border-b-8 border-surface-900  p-4  rounded-xl"
>
	<Tab bind:group={tabSet} active="bg-secondary-800" name="tab1" value={0}>
		<svelte:fragment slot="lead" />
		<span>Overview</span>
	</Tab>
	<Tab bind:group={tabSet} active="bg-secondary-800" name="tab2" value={1}>Detail</Tab>
	<Tab bind:group={tabSet} active="bg-secondary-800" name="tab3" value={2}>Deadline</Tab>
	{#if assignmentProp.assignment.fileAttached}
		<Tab bind:group={tabSet} active="bg-secondary-800" name="tab3" value={3}>File Attaches</Tab>
	{/if}
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		<div class="grid grid-cols-7 mt-8 md:mt-0 gap-y-6">
			<div class="col-span-full lg:col-span-2 flex place-content-center">
				<Chart
					extraOpt={{ color: '#fff' }}
					size={{ width: 218, height: 400 }}
					config={assignmentProp.config}
				/>
			</div>
			<div class="col-span-full lg:col-span-5 w-full">
				{#if tabSet === 0}
					<article class="prose prose-neutral prose-blockquote:font-bold prose-sm">
						<section class="flex flex-col justify-between">
							<div class="">
								<h2 class="!text-white">{assignmentProp.title}</h2>
								<blockquote class="!text-surface-50">
									{prefixConfig.overview.course}
									{assignmentProp.assignment.description}
								</blockquote>
								<blockquote class="!text-surface-50">
									{prefixConfig.overview.courseCode}
									{assignmentProp.course.courseCode}
								</blockquote>
							</div>
							<blockquote class="!text-surface-50">
								{prefixConfig.overview.taughtBy} <br />
								<div class="flex items-center gap-6">
									<Avatar
										width="w-8"
										initials={assignmentProp.teacher.name[0]}
										src={assignmentProp.teacher.imgAvatar}
										background="bg-primary-500"
									/>
									<span class="!text-white">{assignmentProp.teacher.name}</span>
								</div>
							</blockquote>
						</section>
					</article>
				{:else if tabSet === 1}
					<article class="prose prose-blockquote:font-bold prose-sm">
						<section class="flex flex-col justify-between">
							<div class="">
								<h2 class="!text-white">Assignment Detail</h2>
								<blockquote class="!text-surface-50">{assignmentProp.assignment.description}</blockquote>
							</div>
						</section>
					</article>
				{:else if tabSet === 2}
					<section class="flex gap-6 flex-col items-center justify-center">
						<div class="text-center flex flex-col gap-3">
							<h2 class="font-bold">Assignment Deadline</h2>
							<span class="chip variant-filled-primary text-lg"
								>{new Date(assignmentProp.assignment.deadline).toDateString()}</span
							>
						</div>
						<div class="!text-xs shadow-xl border-4 rounded-lg">
							<!-- <Datepicker
								style="font-size: 6px;"
								alwaysOpen
								format={dateFormat}
								buttonBackgroundColor="#e20074"
								buttonTextColor="white"
								highlightColor="#e20074"
								dayBackgroundColor="#374b5e"
								dayTextColor="#fff"
								dayBorderColor="#5f75ce"
								dayHighlightedBackgroundColor="#d93856"
								dayHighlightedTextColor="#fff"
								backgroundColor="#2a3048"
								textColor="#fff"
							/> -->

							<Datepicker
								end={new Date(assignmentProp.assignment.deadline)}
								style="border-radius: 10rem; font-size: 2px !important;"
								alwaysOpen
								highlightColor="#f91a5d"
							/>
						</div>
					</section>
				{:else if tabSet === 3}
					<div class="">
						<p>blank page</p>
					</div>
				{/if}
			</div>
		</div>
	</svelte:fragment>
</TabGroup>
