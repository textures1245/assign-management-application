<script lang="ts">
	import { Stepper, Step, Avatar } from '@skeletonlabs/skeleton';
	import { teacherStates } from '$lib/state/teacherStore';
	import { Add } from 'carbon-icons-svelte';
	import { superForm, type SuperForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { page } from '$app/stores';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import { fade, slide } from 'svelte/transition';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}

	export let data: PageData;
	let showDebug = false;
	const { form, errors, constraints } = superForm(data.form);

	$: isEditor = $page.url.pathname !== '/course-editor';
	$: groupTags = 1;
</script>

<div class="space-y-5">
	<section class="flex gap-6 justify-center items-center">
		<h1 class="chip variant-filled-secondary text-md">
			{isEditor ? 'Course Editor' : 'Add New Course'}
		</h1>
		<hr class="flex-grow h-1 bg-black" />
		<button on:click={() => (showDebug = !showDebug)} class="chip variant-filled-tertiary text-md"
			>Debug</button
		>
	</section>

	<div class="grid gap-4 xl:grid-cols-2">
		{#if showDebug}
			<div transition:slide class="order-none xl:order-1">
				<SuperDebug data={$form} />
			</div>
		{/if}

		<!-- write button with tailwind classes -->

		<div class:col-span-full={!showDebug} class="card p-10 text-white">
			<Stepper buttonCompleteType={'submit'} on:step={onStepHandler}>
				<form use:enhance method="POST" class="space-y-4">
					<Step>
						<svelte:fragment slot="header">
							<div class="flex justify-center gap-4 items-center">
								<span class="chip variant-filled-primary text-sm"> Course Details </span>
								<hr class="flex-grow bg-white" />
							</div>
						</svelte:fragment>
						<div class="space-y-2 text-sm">
							<label for="name"> Course Label </label>
							<input
								{...$constraints.label}
								bind:value={$form.label}
								class="input text-sm"
								name="label"
								title="label"
								type="text"
								placeholder="Input here"
							/>
							<p class="error-text">{$errors.label ?? ''}</p>
						</div>
						<div class="space-y-2 text-sm">
							<label for="name"> Course Code </label>
							<input
								bind:value={$form.courseCode}
								{...$constraints.courseCode}
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
							<select
								{...$constraints.teacherId}
								bind:value={$form.teacherId}
								name="teacherId"
								class="select text-sm"
							>
								{#each teacherStates as t}
									<option value={t.teacherId}>
										<Avatar src={t.imgAvatar} />
										{t.name}</option
									>
								{/each}
							</select>
						</div>
						<div class="" />

						<div class="flex justify-center gap-4 items-center">
							<span class="chip variant-filled-secondary text-sm">
								Course Additional Information
							</span>
							<span class="chip variant-filled-warning">Optional</span>
							<hr class="flex-grow bg-white" />
						</div>
						<div class="space-y-2 text-sm">
							<label for="imgAvatar">Course Avatar Image </label>
							<input
								bind:value={$form.imgSrc}
								class="input"
								title="imgSrc"
								name="imgSrc"
								type="text"
								placeholder="Image URL"
							/>
						</div>
						<div class="space-y-2 text-sm">
							<label for="info">Detail</label>
							<input
								bind:value={$form.detail}
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
						<button class="float-right chip variant-filled-primary px-5 py-2" type="submit"
							>Submit</button
						>
					</Step>
					<!-- <Step>
	
					</Step> -->
				</form>
			</Stepper>
		</div>
	</div>
</div>
