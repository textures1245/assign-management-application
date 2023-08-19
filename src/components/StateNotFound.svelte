<script lang="ts">
	export let text = "You don't have any state, Please consider to push new state.";
</script>

<div class="card shadow-lg variant-glass-tertiary p-10">
	<div class="w-full h-full space-y-4 grid place-content-center place-items-center">
		<script
			src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
		></script>
		<slot name="icon">
			<lottie-player
				src="https://lottie.host/38b8b4e8-0527-422b-b116-a5c29c0866ad/sXbHyYrRRv.json"
				background="transparent"
				speed="1"
				style="width: 300px; height: 300px;"
				loop
				autoplay
			/></slot
		>
		<span class=" uppercase-font text-2xl text-surface-400 text-center text-muted">
            {text}
        </span>
	</div>
</div>
