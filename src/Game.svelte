<script lang="ts">
	import Pipe from "./Pipe.svelte";
	import Bird from "./Bird.svelte";
	import { nextFrame, newGame, jump, start } from "./game";

	let frame = newGame();

	const birdJump = () => jump();

	const startGame = () => {
		frame = start();
		console.log(frame, "frame");
	};

	setInterval(() => {
		frame = nextFrame();
	}, 1000 / 90);
</script>

<main style="width: {frame.width}px; height: {frame.height}px" class="game">
	<section id="score">{frame.score}</section>
	<Bird bird={frame.bird} />
	<Pipe pipe={frame.firstPipe} />
	<Pipe pipe={frame.secondPipe} />
	<section id="init-screen">
		{#if frame.gameOver || !frame.gameStarted}
			<button on:click={startGame}>Start Game</button>
			{#if frame.gameOver}
				<h2>Game Over</h2>
				<h2>Score {frame.score}</h2>
			{/if}
		{/if}
	</section>
	<section id="ground" style="height:{frame.ground.height}px" />
</main>
<svelte:window on:click={birdJump} />

<style>
	main {
		position: relative;
		border: 1px solid black;
		overflow: hidden;
		background-color: lightblue;
		margin: auto;
	}
	#ground {
		background-color: brown;
		position: absolute;
		width: 100%;
		left: 0;
		right: 0;
		bottom: 0;
	}
	#init-screen {
		user-select: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
		font-family: monospace;
	}
	#init-screen h2 {
		text-align: center;
	}
	#init-screen button {
		font-family: monospace;
		font-size: 16px;
		border: none;
		border-radius: none;
		background-color: ghostwhite;
		padding: 10px;
		cursor: pointer;
		outline: none;
		transition: ease-in-out 0.2s font-size;
		display: block;
		margin: 0 auto;
	}

	#init-screen button:active,
	#init-screen button:focus {
		outline: none;
		font-size: 15px;
	}
	#score {
		position: absolute;
		right: 10px;
		top: 10px;
		font-size: 20px;
		z-index: 10;
		padding: 5px;
		font-family: cursive;
		background-color: white;
		user-select: none;
	}
</style>
