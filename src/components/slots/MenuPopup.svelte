<script lang="ts">
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	let valueSelected: string = 'something';
</script>

<div class="fixed w-3/12 card p-4 shadow-xl" data-popup="menu-panel">
	<ListBox rounded="rounded-none">
		<ListBoxItem bind:group={valueSelected} name="medium" value="books">Books</ListBoxItem>
		<ListBoxItem bind:group={valueSelected} name="medium" value="movies">Movies</ListBoxItem>
		<ListBoxItem bind:group={valueSelected} name="medium" value="television">TV</ListBoxItem>
	</ListBox>
	<div class="arrow bg-surface-100-800-token" />
</div>
