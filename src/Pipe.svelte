<script lang="ts">
	import type { PipePair } from "./game";
	export let pipe: PipePair;
</script>

{#if pipe.show}
	<section
		style="left: {pipe.left}px; top: {pipe.topPipe
			.top}px; width: {pipe.width}px; height: {pipe.topPipe
			.height}px;"
		class="top-pipe"
	/>
	<section
		style="left: {pipe.left}px; top: {pipe.bottomPipe
			.top}px; width: {pipe.width}px; height: {pipe.bottomPipe
			.height}px;"
		class="bottom-pipe"
	/>
{/if}

<style>
	.top-pipe {
		position: absolute;
		background: linear-gradient(#3cb566, #49e680);
	}
	.bottom-pipe {
		position: absolute;
		background: linear-gradient(#49e680, #3cb566);
	}
</style>
