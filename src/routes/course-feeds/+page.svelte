<script lang="ts">
	import CourseCard from './../../components/CourseCard.svelte';
	import { courseStates } from '../../libs/state/courseStore';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-wrap gap-6 justify-evenly">
	{#each data.courses as course (course.courseId)}
		<CourseCard {course} />
	{/each}
</div>
