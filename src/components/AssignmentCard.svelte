<script lang="ts">
	import { Assignment } from './../libs/state/assignmentStore.ts';
	import { TabGroup, Tab, TabAnchor, Avatar } from '@skeletonlabs/skeleton';
	import Datepicker from 'svelte-calendar-resurrected';
	import Chart from './Chart.svelte';
	import type { AssignmentProp } from '../libs/state/assignmentStore';
	import dayjs from 'dayjs';
	export let assignment: AssignmentProp;
	import { InlineCalendar } from 'svelte-calendar';

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
	class="primary-thai-font bg-tertiary-200 shadow-lg   border-r-8 border-b-4 border-surface-400  p-4  rounded-xl"
>
	<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab1" value={0}>
		<svelte:fragment slot="lead" />
		<span>Overview</span>
	</Tab>
	<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab2" value={1}>Detail</Tab>
	<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab3" value={2}>Deadline</Tab>
	{#if assignment.fileAttached}
		<Tab bind:group={tabSet} active="bg-tertiary-500" name="tab3" value={3}>File Attaches</Tab>
	{/if}
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		<div class="grid grid-cols-7 mt-8 md:mt-0 gap-y-6">
			<div class="col-span-full lg:col-span-2 flex place-content-center">
				<Chart size={{ width: 218, height: 400 }} config={assignment.config} />
			</div>
			<div class="col-span-full lg:col-span-5 w-full">
				{#if tabSet === 0}
					<article class="prose prose-blockquote:font-bold prose-sm">
						<section class="flex flex-col justify-between">
							<div class="">
								<h2>{assignment.title}</h2>
								<blockquote>{prefixConfig.overview.course} {assignment.description}</blockquote>
								<blockquote>
									{prefixConfig.overview.courseCode}
									{assignment.course.courseCode}
								</blockquote>
							</div>
							<blockquote>
								{prefixConfig.overview.taughtBy} <br />
								<div class="flex items-center gap-6">
									<Avatar
										width="w-8"
										initials={assignment.teacher.name[0]}
										src={assignment.teacher.imgAvatar}
										background="bg-primary-500"
									/>
									<span>{assignment.teacher.name}</span>
								</div>
							</blockquote>
						</section>
					</article>
				{:else if tabSet === 1}
					<article class="prose prose-blockquote:font-bold prose-sm">
						<section class="flex flex-col justify-between">
							<div class="">
								<h2>Assignment Detail</h2>
								<blockquote>{assignment.description}</blockquote>
							</div>
						</section>
					</article>
				{:else if tabSet === 2}
					<section class="flex gap-3 flex-col items-center justify-center">
						<div class="text-center">
							<h2 class="font-bold">Assignment Deadline</h2>
							<p class="text-xl">{new Date(assignment.deadline).toDateString()}</p>
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
								end={new Date(assignment.deadline)}
								style="border-radius: 10rem; font-size: 2px !important;"
								alwaysOpen
								highlightColor="#f91a5d"
							/>
						</div>
					</section>
				{:else if tabSet === 3}{/if}
			</div>
		</div>
	</svelte:fragment>
</TabGroup>
