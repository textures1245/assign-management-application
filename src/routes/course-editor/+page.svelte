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
	import FormEditor from '../../components/slots/FormEditor.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';
	import type { courseSchema } from '$lib/types.ts';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}

	export let data: PageData;
	let showDebug = false;
	const { form, errors, constraints } = superForm(
		data.form ?? ({} as SuperValidated<typeof courseSchema>)
	);

	function deleteTag<T>(arr: T[], index: number) {
		return arr.filter((_, i) => i !== index);
	}

	$: groupTags = 1;
	$: groupTagArray = Array(groupTags);
</script>

<FormEditor pathname="course-editor" formName="Course">
	<div slot="superDebugSlot">
		<SuperDebug data={$form} />
	</div>
	<div slot="form">
		<form use:enhance method="POST" class="space-y-4">
			<Step>
				<svelte:fragment slot="header">
					<div class="flex justify-center gap-4 items-center">
						<span class="chip variant-filled-primary text-sm"> Course Details </span>
						<hr class="flex-grow bg-white" />
					</div>
				</svelte:fragment>
				{#if data.editMode}
					<input
						bind:value={$form.id}
						class="input text-sm"
						hidden
						name="id"
						title="label"
						type="text"
						placeholder="Input here"
					/>
				{/if}
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
						{#each $teacherStates as t}
							<option value={t.id}>
								<Avatar src={t.imgAvatar} />
								{t.name}</option
							>
						{/each}
					</select>
				</div>
				<div class="" />

				<div class="flex justify-center gap-4 items-center">
					<span class="chip variant-filled-secondary text-sm"> Course Additional Information </span>
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
						{#each $form.group ?? [] as tag, i}
							<div class="flex gap-2">
								<input
									class="input"
									name="group"
									bind:value={tag}
									title="group"
									type="text"
									placeholder="Input here"
								/>
								<button
									type="button"
									on:click={() => ($form.group = deleteTag($form.group ?? [], i))}
									class="variant-filled-error btn">-</button
								>
							</div>
						{/each}
						{#each groupTagArray as _, i}
							<div class="flex gap-2">
								<input
									class="input"
									name="group"
									title="group"
									type="text"
									placeholder="Input here"
								/>
								<button
									type="button"
									on:click={() => (groupTagArray = deleteTag(groupTagArray, i))}
									class="btn variant-filled-error">-</button
								>
							</div>
						{/each}
					</div>
				</div>

				{#if data.editMode}
					<div class="float-right">
						<button type="submit" formaction="?/delete" class=" chip variant-filled-error px-5 py-2"
							>Delete</button
						>
						<button
							type="submit"
							formaction="?/update"
							class="chip variant-filled-primary px-5 py-2">Update</button
						>
					</div>
				{:else}
					<button
						formaction="?/create"
						class="float-right chip variant-filled-primary px-5 py-2"
						type="submit">Submit</button
					>
				{/if}
			</Step>
		</form>
	</div>
</FormEditor>
