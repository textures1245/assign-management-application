<script lang="ts">
	import type { Course } from '$lib/state/courseStore';
	import type { ICourseTeacher } from '$lib/types';
	import { Avatar } from '@skeletonlabs/skeleton';

	export let course: ICourseTeacher;
</script>

<a class="card bg-initial w-80 card-hover overflow-hidden" href={`/course-view/${course.id}`}
	><header>
		<img src={course.imgSrc} class=" bg-black/50" alt="Post" />
	</header>
	<div class="p-4 bg-gradient-to-tr from-surface-500 text-white space-y-4">
		<span class="chip variant-filled-secondary">{course.courseCode}</span>
		<h3 class="h5" data-toc-ignore="">{course.label}</h3>
		<article class="prose prose-sm text-surface-50">
			<p>
				{course.detail}
			</p>
		</article>
		<div class="flex flex-wrap gap-2">
			{#if course.group}
				{#each course.group as tag}
					<span class="chip text-[10px] px-1.5 py-1 variant-filled">{tag}</span>
				{/each}
			{/if}
		</div>
	</div>
	<hr class="opacity-50" />
	<footer class="p-4 bg-surface-500/80 flex justify-start items-center space-x-4">
		<figure
			class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-8 rounded-full"
			data-testid="avatar"
		>
			<Avatar
				initials={course.teacher.name[0]}
				class="avatar-image bg-surface-300 w-full h-full object-cover"
				src={course.teacher.imgAvatar}
				alt="teacherAvatarSrc"
			/>
		</figure>
		<div class="flex-auto flex justify-between items-center">
			<span class="chip variant-filled-primary">{course.teacher.name}</span>
			<!-- <small class="chip variant-filled">On 22/7/2566</small> -->
		</div>
	</footer></a
>
