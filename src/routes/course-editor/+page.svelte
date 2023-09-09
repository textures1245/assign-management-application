<script lang="ts">
	import { Stepper, Step, Avatar } from '@skeletonlabs/skeleton';
	import { type ITeacher, type ICourse, courseSchema } from '../../libs/types';
	import { teacherStates } from '../../libs/state/teacherStore';
	import { Add } from 'carbon-icons-svelte';
	import { superForm, type SuperForm } from 'sveltekit-superforms/client';
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}

	export let data: PageData;

	const { form, errors, constraints } = superForm(data.form, { dataType: 'json' });

	$: isEditor = $page.url.pathname !== '/course-editor';
	$: groupTags = 1;

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

<div class="space-y-5">
	<section class="flex gap-6 justify-center items-center">
		<h1 class="chip variant-filled-secondary text-md">
			{isEditor ? 'Course Editor' : 'Add New Course'}
		</h1>
		<hr class="flex-grow h-1 bg-black" />
	</section>
	<div class="card p-10 text-white">
		<Stepper buttonCompleteType={'submit'} on:step={onStepHandler}>
			<form method="POST" action="?/addCourse" class="space-y-4">
				<Step>
					<svelte:fragment slot="header">
						<span class="chip variant-filled-primary text-sm"> Course Details </span>
					</svelte:fragment>
					<div class="space-y-2 text-sm">
						<label for="name"> Course Label </label>
						<input
							bind:value={$form.label}
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
					<div class="space-y-2 text-sm">
						<label for="imgAvatar">Course Avatar Image </label>
						<input class="input" title="imgSrc" name="imgSrc" type="text" placeholder="Image URL" />
					</div>
					<div class="space-y-2 text-sm">
						<label for="info">Detail</label>
						<input
							class="input"
							name="detail"
							title="detail"
							type="text"
							placeholder="Input here"
						/>
					</div>
					<div class="space-y-2 text-sm">
						<div class="flex justify-between">
							<label for="group">Group/Tag</label>
							<button
								type="button"
								on:click={() => groupTags++}
								class="chip variant-filled-secondary text-md"
							>
								<Add size="12" />
							</button>
						</div>

						<div class="space-y-2">
							{#each Array(groupTags) as _, i}
								<input
									class="input"
									name="group"
									title="group"
									type="text"
									placeholder="Input here"
								/>
							{/each}
						</div>
					</div>
				</Step>
			</form>
		</Stepper>
	</div>
</div>
