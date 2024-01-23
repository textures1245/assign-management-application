<script lang="ts">
	import { enhance } from '$app/forms';
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
	class="primary-thai-font bg-surface-800   text-white shadow-surface-lg   border-l-4 border-secondary-600  p-4  rounded-xl"
>
	<Tab bind:group={tabSet} active="bg-secondary-800" name="tab1" value={0}>
		<svelte:fragment slot="lead" />
		<span>Overview</span>
	</Tab>
	{#if assignmentProp.assignment.fileAttached}
		<Tab bind:group={tabSet} active="bg-secondary-800" name="tab3" value={3}>File Attaches</Tab>
	{/if}
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		<div class="relative">
			<div class="absolute -top-14 right-0">
				<form use:enhance method="POST">
					<input type="text" hidden name="id" value={assignmentProp.assignment.id} />
					<button formaction="?/returnAssignment" class="btn btn-sm variant-filled-success"
						>Return</button
					>
				</form>
			</div>
		</div>
		<div class="grid grid-cols-7 place-items-center h-full min-h-[21rem] mt-8 md:mt-0 gap-y-6">
			<div class="col-span-full lg:col-span-2 flex items-center justify-center">
				<div class="card col-span-full lg:col-span-2 flex p-4">
					<Chart
						extraOpt={{ color: '#fff' }}
						size={{ width: 218, height: 400 }}
						config={assignmentProp.config}
					/>
				</div>
			</div>
			<div class="col-span-full lg:col-span-2 w-full">
				{#if tabSet === 0}
					<article class="prose prose-neutral prose-blockquote:font-bold prose-sm">
						<section class="flex flex-col justify-between">
							<div class="">
								<h2 class="!text-white">{assignmentProp.assignment.title}</h2>
								<blockquote class="!text-surface-50">
									{prefixConfig.overview.course}
									{assignmentProp.assignment.title}
								</blockquote>
								<blockquote class="!text-surface-50">
									{prefixConfig.overview.courseCode}
									{assignmentProp.course.courseCode}
								</blockquote>
								<h2 class="!text-white">Assignment Detail</h2>
								<blockquote class="!text-surface-50">
									{assignmentProp.assignment.description.slice(0, 100) + '...'}
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
					<div class="">
						<p>blank page</p>
					</div>
				{/if}
			</div>
			<div class="col-span-full lg:col-span-3">
				<div class="!text-xs shadow-xl border-4 rounded-lg">
					<!-- <Datepicker
						style="border-radius: 10rem; font-size: 1px !important;"
						alwaysOpen
						highlightColor="#f91a5d"
					/> -->
					<Datepicker
						format={dateFormat}
						alwaysOpen
						buttonBackgroundColor="#e20074"
						buttonTextColor="white"
						highlightColor="#e20074"
						dayBackgroundColor="#374b5e"
						dayTextColor="#fff"
						dayBorderColor="#5f75ce"
						end={new Date(assignmentProp.assignment.deadline)}
						dayHighlightedBackgroundColor="#d93856"
						dayHighlightedTextColor="#fff"
						backgroundColor="#2a3048"
						textColor="#fff"
					/>
				</div>
			</div>
		</div>
	</svelte:fragment>
</TabGroup>
