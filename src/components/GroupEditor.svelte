<script lang="ts">
	import { Stepper, Step, Avatar } from '@skeletonlabs/skeleton';
	import { courseMenuLeads } from '../layouts/states/layoutState';
	import { teacherStates } from '$lib/state/teacherStore';

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

<Stepper on:step={onStepHandler} buttonCompleteType="submit">
	<form action="" class="space-y-4">
		<Step>
			<svelte:fragment slot="header">
				<span class="chip variant-filled-primary text-sm"> Course Details </span>
			</svelte:fragment>
			<div class="space-y-2 text-sm">
				<label for="name"> Add new Group/Tag </label>
				<input
					class="input text-sm"
					name="label"
					title="label"
					type="text"
					placeholder="Input here"
				/>
			</div>
			<div class="space-y-2 text-sm">
				<label for="name"> Course Code </label>
				<input
					class="input text-sm"
					name="courseCode"
					title="courseCode"
					type="text"
					placeholder="Input here"
				/>
			</div>
			<div class="space-y-2 text-sm">
				<label for="name"> Select Course's Instructor </label>
				<span>Select</span>
				<select name="teacherId" class="select text-sm">
					{#each teacherStates as t}
						<option value={t.teacherId}>
							<Avatar src={t.imgAvatar} />
							{t.name}</option
						>
					{/each}
				</select>
			</div>
		</Step>
		<Step>
			<svelte:fragment slot="header">
				<span class="chip variant-filled-primary text-sm"> Course Additional Information </span>
				<span class="chip variant-filled-warning">Optional</span>
			</svelte:fragment>
		</Step>
	</form>
</Stepper>
