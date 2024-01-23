<script lang="ts">
	import type { teacherSchema } from '../../lib/types.js';
	import { Stepper, Step, Avatar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';

	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import FormEditor from '../../components/slots/FormEditor.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import type { SuperValidated } from 'sveltekit-superforms/index.d.ts';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}

	export let data: PageData;
	const { form, errors, constraints } = superForm(
		data.form || ({} as SuperValidated<typeof teacherSchema>)
	);
</script>

<FormEditor pathname="instructor-editor" formName="Instructor">
	<div slot="superDebugSlot">
		<SuperDebug data={$form} />
	</div>
	<div slot="form">
		<form use:enhance method="POST" class="space-y-4">
			<Step>
				<svelte:fragment slot="header">
					<span class="chip variant-filled-primary text-sm"> Instructor Information </span>
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
					<label for="name"> Teacher Name </label>
					<input
						bind:value={$form.name}
						class="input"
						title="name"
						name="name"
						{...$constraints.name}
						type="text"
						placeholder="Input here"
					/>
					<p class="error-text">{$errors.name ?? ''}</p>
				</div>
				<div class="flex justify-center gap-4 items-center">
					<span class="chip variant-filled-secondary text-sm">
						Instructor Additional Information
					</span>
					<span class="chip variant-filled-warning">Optional</span>
					<hr class="flex-grow bg-white" />
				</div>
				<div class="space-y-2 text-sm">
					<label for="imgAvatar">Image Avatar </label>
					<input
						bind:value={$form.imgAvatar}
						class="input"
						title="imgAvatar"
						name="imgAvatar"
						type="text"
						{...$constraints.imgAvatar}
						placeholder="Input here"
					/>
					<p class="error-text">{$errors.imgAvatar ?? ''}</p>
				</div>
				<div class="space-y-2 text-sm">
					<label for="info">About</label>
					<input
						class="input"
						{...$constraints.info}
						bind:value={$form.info}
						name="info"
						title="info"
						type="text"
						placeholder="Input here"
					/>
					<p class="error-text">{$errors.info ?? ''}</p>
				</div>
				<div class="space-y-2 text-sm">
					<label for="rank">Rank</label>
					<input
						class="input"
						{...$constraints.rank}
						bind:value={$form.rank}
						name="rank"
						title="rank"
						type="text"
						placeholder="Input here"
					/>
					<p class="error-text">{$errors.rank ?? ''}</p>
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
