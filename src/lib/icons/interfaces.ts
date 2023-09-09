import { SvelteComponentTyped } from 'svelte';

interface AddProps {
  size: number;
  // Other prop definitions
}

declare class Add extends SvelteComponentTyped<AddProps> {}

export default Add;
