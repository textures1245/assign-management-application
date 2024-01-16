<script lang="ts">
	export let text = 'State not found.';
</script>

<div class="">
	<script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>

	<div
		class="card shadow-xl bg-gradient-to-b via-secondary-900 to-tertiary-900 from-surface-900 p-10 z-10"
	>
		<div class="flex justify-between items-center">
			<h1 class="text-2xl">Empty State</h1>
			<lottie-player
				src="https://lottie.host/659197fb-cf47-48bb-8e74-b3a94945b71f/aKOT6sKChT.json"
				background="transparent"
				speed="1"
				style="width: 200px; height: 100px;"
				loop
				class=""
				autoplay
			/>
		</div>
		<hr class="border-2" />

		<p class=" mt-10 text-lg font-extralight text-surface-200 text-center text-muted">
			{text}
		</p>
	</div>
	<slot name="icon">
		<!-- rotated this lottie-plater to 90 degree -->
		<!-- <lottie-player
				src="https://lottie.host/d1f92fd9-2d53-4d43-b2e3-ee9cd8ddaea4/leyqFTw9so.json"
				background="transparent"
				speed="1"
				style="width: 350px; height: 350px;"
				loop
				autoplay
				class="absolute opacity-60 bottom-10 trasform rotate-90"
			/> -->
	</slot>
	<div class="card bg-opacity-30" />
</div>
