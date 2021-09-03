<script lang="ts">
	import type { Bird } from "./game";
	export let bird: Bird;
</script>

<div
	class="bird"
	style="top:{bird.top}px; left:{bird.left}px; width:{bird.size}px; height:{bird.size}px"
/>

<style>
	.bird {
		border: 1px solid black;
		background-color: orange;
		position: absolute;
	}
</style>
