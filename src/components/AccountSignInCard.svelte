<script lang="ts">
</script>

<div class=" text-white p-4">
	<section class="p-4">
		<slot name="content">
			<div class="flex min-h-screen items-center justify-center">
				<div
					class="shadow-2xl shadow-surface-400/50 max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent"
				>
					<div class="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
						<div>
							<slot name="header"
								><h1 class="text-xl font-semibold text-gray-800 dark:text-white">
									Signin to your account
								</h1>
								<p class="text-sm tracking-wide text-gray-600 dark:text-gray-300">
									Don't have an account ? <a
										href=""
										class="text-blue-600 transition duration-200 hover:underline dark:text-blue-400"
										>Signup</a
									> for free
								</p></slot
							>
						</div>

						<div class="mt-8 space-y-8">
							<slot name="form" />
						</div>
					</div>
				</div>
			</div>
		</slot>
	</section>
	<footer class="card-footer">
		<slot name="footer" />
	</footer>
</div>
