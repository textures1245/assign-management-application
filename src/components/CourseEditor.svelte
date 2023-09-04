<script lang="ts">
	import { Stepper, Step, Avatar } from '@skeletonlabs/skeleton';
	import type { ITeacher, ICourse } from '../libs/types';
	import { courseMenuLeads } from '../layouts/states/layoutState';
	import { teacherStates } from '../libs/state/teacherStore';
	import { Add } from 'carbon-icons-svelte';
	import * as yup from 'yup';
	import { createForm } from 'svelte-forms-lib';

	function onStepHandler(e: {
		detail: { state: { current: number; total: number }; step: number };
	}): void {}

	export let form;

	// const { form, errors, state, handleChange, handleSubmit, handleReset } = createForm({
	// 	initialValues: <ICourse>{
	// 		courseId: '',
	// 		teacherId: '',
	// 		courseCode: '',
	// 		imgSrc: '',
	// 		label: '',
	// 		curd: {
	// 			created: new Date(),
	// 			updated: new Date(),
	// 			deleted: new Date()
	// 		},
	// 		detail: '',
	// 		group: []
	// 	},
	// 	validationSchema: yup.object().shape({
	// 		courseId: yup.string().required(),
	// 		courseCode: yup.string().required(),
	// 		teacherId: yup.string().required(),
	// 		label: yup.string().required(),
	// 		curd: yup.object().shape({
	// 			created: yup.date().required(),
	// 			updated: yup.date().required()
	// 		}),
	// 		detail: yup.string(),
	// 		imgSrc: yup.string(),
	// 		group: yup.array().of(yup.string())
	// 	}),
	// 	onSubmit: (values) => {
	// 		alert(JSON.stringify(values));
	// 		console.log(values);
	// 	}
	// });

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

<Stepper buttonCompleteType={'submit'} su on:step={onStepHandler}>
	<form class="space-y-4">
		<Step>
			<svelte:fragment slot="header">
				<span class="chip variant-filled-primary text-sm"> Course Details </span>
			</svelte:fragment>
			<div class="space-y-2 text-sm">
				<label for="name"> Course Label </label>
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
			<div class="space-y-2 text-sm">
				<label for="imgAvatar">Course Avatar Image </label>
				<input class="input" title="imgSrc" name="imgSrc" type="text" placeholder="Image URL" />
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
					<span class="chip variant-filled-secondary text-md">
						<Add size="12" />
					</span>
				</div>
				<input
					bind:value={$form.group}
					class="input"
					name="group"
					title="group"
					type="text"
					placeholder="Input here"
				/>
			</div>
		</Step>
	</form>
</Stepper>
