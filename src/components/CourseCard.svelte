<script lang="ts">
	import type { ICourse } from '../libs/types';
	import type { Course } from './../libs/state/courseStore';

	export let course: ICourse;
</script>

<div class="chart-container">
	<a class="card bg-initial card-hover overflow-hidden" href="/elements/cards"
		><header>
			<img src={course.imgSrc} class="bg-black/50" alt="Post" />
		</header>
		<div class="p-4 bg-tertiary-300 space-y-4">
			<span class="chip variant-filled-secondary">{course.label}</span>
			<h3 class="h5" data-toc-ignore="">Skeleton is Awesome!</h3>
			<article class="prose prose-sm">
				<p>
					{course.detail}
				</p>
			</article>
		</div>
		<hr class="opacity-50" />
		<footer class="p-4 bg-tertiary-300/80 flex justify-start items-center space-x-4">
			<figure
				class="avatar flex aspect-square text-surface-50 font-semibold justify-center items-center overflow-hidden isolate bg-surface-400-500-token w-8 rounded-full"
				data-testid="avatar"
			>
				<img
					class="avatar-image w-full h-full object-cover"
					src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&amp;ixlib=rb-4.0.3&amp;w=32&amp;h=32&amp;auto=format&amp;fit=crop"
					alt=""
					style=""
				/>
			</figure>
			<div class="flex-auto flex justify-between items-center">
				<span class="chip variant-filled">Chip</span>
				<small class="chip variant-filled">On 22/7/2566</small>
			</div>
		</footer></a
	>
</div>
