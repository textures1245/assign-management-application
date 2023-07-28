<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import Chart from '../../components/Chart.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col gap-10">
	<div id="heading" class="flex flex-col md:flex-row justify-between gap-10  items-center">
		<article class="prose prose-sm md:prose-md prose-neutral ">
			<h1>Welcome Back, Phakh</h1>
			<blockquote class="">Last Online: 21/5/2022</blockquote>
		</article>
		<Avatar
			src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
			width="w-32"
			rounded="rounded-full"
		/>
	</div>
	<hr />
	{#if data}
		<div class="grid md:grid-cols-2 gap-y-14 place-items-center">
			<div class="flex flex-col gap-5">
				<Chart config={data.assignments} />
				<span class="chip variant-filled-primary">Assignments Progression</span>
			</div>
			<div class="flex flex-col gap-5">
				<Chart config={data.doneAssignments} />
				<span class="chip variant-filled-secondary">Done Assignments Progression</span>
			</div>
			<div class="flex col-span-full flex-col gap-5">
				<Chart size={{ width: 500, height: 400 }} config={data.diaryProgression} />
				<span class="chip variant-filled-secondary">Diary Assignments Progression</span>
			</div>
		</div>
	{/if}
</section>
