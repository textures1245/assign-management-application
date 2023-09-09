<script lang="ts">
	import CourseCard from './../../components/CourseCard.svelte';
	import { courseStates } from '$lib/state/courseStore';
	import type { PageData } from './$types';
	import StateNotFound from '../../components/StateNotFound.svelte';

	export let data: PageData;
</script>

<div class="flex flex-wrap gap-6 justify-evenly">
	{#each data.courses as course (course.courseId)}
		<CourseCard {course} />
	{:else}
		<div class="w-full">
			<StateNotFound text={"You don't have any courses right now, Try to add one."}>
				<div slot="icon">
					<lottie-player
						src="https://lottie.host/345aa07a-274e-44ae-9bea-445e631b1104/bKUHcjrfIC.json"
						background="transparent"
						speed="1"
						style="width: 300px; height: 300px;"
						autoplay
					/>
				</div>
			</StateNotFound>
		</div>
	{/each}
</div>
