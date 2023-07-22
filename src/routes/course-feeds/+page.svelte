<script lang="ts">
	import CourseCard from './../../components/CourseCard.svelte';
	import type { PageData } from './$types';
	import { Course } from '../../libs/state/courseStore';
	import type { Writable } from 'svelte/store';

	export let data: PageData;
	let courses: Writable<Course[]>;
	$: courses = data.courses;
</script>

{#each $courses as course (courses.courseId)}
	<!-- content here -->
	<CourseCard {course} />
{/each}
