<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton';
	import AccountSignInCard from '../../components/AccountSignInCard.svelte';
	import type { EnumValues } from 'zod';

	let mode: 'SIGN_UP' | 'SIGN_IN' = 'SIGN_IN';
</script>

<div class="bg-surface-900 h-full w-full primary-font">
	<div class="grid grid-cols-7 h-screen">
		<img
			class="h-full w-full absolute md:relative col-span-3 object-cover"
			src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80"
			alt="vector-background"
		/>
		<div id="signin-container" class="z-10 col-span-full md:col-span-4">
			<section class="grid place-self-center" id="signin-card">
				<!-- <Avatar src="" /> -->
				<AccountSignInCard>
					<div class="space-y-4" slot="header">
						<div class="logo-container">
							<Avatar src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" />
						</div>
						<h1 class="text-2xl gradient-text font-extrabold">Signin to your account</h1>
						<p class="text-sm tracking-wide">
							{mode === 'SIGN_IN' ? "Don't have an account?" : 'Already have an account?'}
							<button
								on:click={() => (mode === 'SIGN_IN' ? (mode = 'SIGN_UP') : (mode = 'SIGN_IN'))}
								class="text-blue-600 capitalize transition duration-200 hover:underline dark:text-blue-400"
								>{mode === 'SIGN_IN' ? 'Sign Up' : 'Sign In'}</button
							>
						</p>
					</div>
					<div slot="form" class="space-y-6">
						<form
							method="POST"
							class="space-y-4"
							action={mode === 'SIGN_IN' ? '?/signIn' : '?/signUp'}
						>
							{#if mode === 'SIGN_UP'}
								<input
									class="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
									placeholder="Your Nickname"
									type="text"
									name="name"
									id="email"
								/>
							{/if}
							<input
								class="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
								placeholder="Your Email"
								type="email"
								name="email"
								id="email"
							/>

							<input
								class="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
								placeholder="Your Password"
								type="password"
								name="password"
								id="password"
							/>
							<button
								type="submit"
								class="h-9 px-3 w-full bg-gradient-to-r hover:bg-pos-100 from-indigo-500 hover:bg-blue-600 shadow-md shadow-indigo-600 active:bg-blue-800 focus:bg-blue-700 transition duration-800 rounded-md text-white"
							>
								SignIn
							</button>
						</form>
					</div>
				</AccountSignInCard>
			</section>
		</div>
	</div>
</div>
