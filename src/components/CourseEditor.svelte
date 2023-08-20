<script lang="ts">
	import { Stepper, Step } from '@skeletonlabs/skeleton';
	import type { ITeacher, ICourse } from '../libs/types';
	import { courseMenuLeads } from '../layouts/states/layoutState';

	function onCompleteHandler(e: Event): void {}

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}
    
	// courseId: string;
	// courseCode: string;
	// teacherId: string;
	// imgSrc: string;
	// label: string;
	// curd: {
	// 	created: Date;
	// 	updated: Date;
	// 	deleted: Date;
	// };
	// detail?: string;
	// group?: string[];
</script>

<Stepper on:step={onStepHandler} on:complete={onCompleteHandler}>
	<form action="" class="space-y-4">
		<Step>
			<svelte:fragment slot="header">
				<span class="chip variant-filled-primary text-lg"> Course Information </span>
			</svelte:fragment>
			<div class="space-y-2 text-sm">
				<label for="name"> Teacher Name </label>
				<input class="input" title="name" type="text" placeholder="Input here" />
			</div>
		</Step>
		<Step>
			<svelte:fragment slot="header">
				<span class="chip variant-filled-primary text-lg"> Additional Information </span>
			</svelte:fragment>
			<div class="space-y-2 text-sm">
				<label for="imgAvatar">Image Avatar </label>
				<input
					class="input"
					title="imgAvatar"
					name="imgAvatar"
					type="text"
					placeholder="Input here"
				/>
			</div>
			<div class="space-y-2 text-sm">
				<label for="info">About</label>
				<input class="input" name="info" title="info" type="text" placeholder="Input here" />
			</div>
			<div class="space-y-2 text-sm">
				<label for="rank">Rank</label>
				<input class="input" name="rank" title="rank" type="text" placeholder="Input here" />
			</div>
		</Step>
	</form>
</Stepper>
