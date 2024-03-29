<script lang="ts">
	import { superValidate } from 'sveltekit-superforms/server';
	import { Step, Avatar, FileDropzone } from '@skeletonlabs/skeleton';
	import { courseStates } from '$lib/state/courseStore';
	import { Upload, FileStorage } from 'carbon-icons-svelte';
	import { superForm, type SuperForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	import FormEditor from '../../components/slots/FormEditor.svelte';
	import type { assignmentSchema } from '$lib/types';
	import type { SuperValidated } from 'sveltekit-superforms/index.d.ts';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}

	export let data: PageData;
	const { form, errors, constraints } = superForm(
		data.form || ({} as SuperValidated<typeof assignmentSchema>),
		{ dataType: 'json' }
	);
</script>

<FormEditor pathname="task-editor" formName="Task">
	<div slot="superDebugSlot">
		<SuperDebug data={$form} />
	</div>
	<div slot="form">
		<form use:enhance method="POST" class="space-y-4">
			<Step>
				<svelte:fragment slot="header">
					<div class="flex justify-center gap-4 items-center">
						<span class="chip variant-filled-primary text-sm"> Task Details </span>
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
					<input
						bind:value={$form.teacherId}
						class="input text-sm"
						hidden
						name="teacherId"
						title="label"
						type="text"
						placeholder="Input here"
					/>
				{/if}
				<div class:hidden={data.editMode} class="space-y-2 text-sm">
					<label for="name"> Select Course's Instructor </label>
					<span>Select</span>
					<select
						{...$constraints.courseId}
						bind:value={$form.courseId}
						name="courseId"
						class="select text-sm"
					>
						{#each $courseStates as c}
							<option value={c.id}> {c.label}</option>
						{/each}
					</select>
					<p class="error-text">{$errors.courseId ?? ''}</p>
				</div>
				<div class="space-y-2 text-sm">
					<label for="name"> Task title </label>
					<input
						{...$constraints.title}
						bind:value={$form.title}
						class="input text-sm"
						name="title"
						title="Course Title"
						type="text"
						placeholder="Input here"
					/>
					<p class="error-text">{$errors.title ?? ''}</p>
				</div>
				<div class="space-y-2 text-sm">
					<label for="name">Description </label>
					<input
						bind:value={$form.description}
						{...$constraints.description}
						class="input text-sm"
						name="description"
						title="description"
						type="text"
						placeholder="Input here"
					/>
					<p class="error-text">{$errors.description ?? ''}</p>
				</div>
				<div class="space-y-2 text-sm">
					<label for="name">Deadline Definition </label>
					<input
						bind:value={$form.deadline}
						{...$constraints.deadline}
						class="input text-sm"
						name="deadline"
						title="Deadline Definition"
						type="date"
						placeholder="Input here"
					/>
					<p class="error-text">{$errors.deadline ?? ''}</p>
				</div>
				<div class="space-y-2 text-sm">
					<label for="name">Task Priority</label>
					<select
						bind:value={$form.priority}
						{...$constraints.priority}
						class="input text-sm"
						name="priority"
						title="Task Priority"
						placeholder="Input here"
					>
						{#each ['MOST', 'DECENT', 'LOW'] as p}
							<option value={p}> {p}</option>
						{/each}</select
					>
					<p class="error-text">{$errors.priority ?? ''}</p>
				</div>

				<div class="flex justify-center gap-4 items-center">
					<span class="chip variant-filled-secondary text-sm"> Task Additional Information </span>
					<span class="chip variant-filled-warning">Optional</span>
					<hr class="flex-grow bg-white" />
				</div>
				<div class="space-y-2 text-sm">
					<label for="name">Files Attach</label>
					<FileDropzone class="space-y-8" bind:file={$form.fileAttached} name="files">
						<svelte:fragment slot="lead">
							<div class="justify-center flex">
								<FileStorage size="42" />
							</div>
						</svelte:fragment>
						<svelte:fragment slot="message"
							><b>Upload files</b> or <b>drag and drop</b>
						</svelte:fragment>
						<svelte:fragment slot="meta">
							<span>Expect <b>JPG, PNG, PDF</b> are allowed</span>
						</svelte:fragment>
					</FileDropzone>
					<p class="error-text">{$errors.fileAttached ?? ''}</p>
				</div>
				<div class="space-y-2 text-sm">
					<label for="grade">Grade </label>
					<input
						bind:value={$form.grade}
						class="input"
						title="Grade"
						name="grade"
						type="number"
						placeholder="Input here"
					/>
				</div>
				<div class="space-y-2 text-sm">
					<label for="info">Submission</label>
					<input
						bind:value={$form.submission}
						class="input"
						name="submission"
						title="Submission"
						type="text"
						placeholder="Input here"
					/>
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
