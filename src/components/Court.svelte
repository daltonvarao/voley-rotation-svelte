<script lang="ts">
	import playerStore, { players } from '../lib/store';
	import PlayerComponent from './Player.svelte';

	players.subscribe((state) => {
		console.log({ state });
		state.forEach((p) => p.validate(state));
	});
</script>

<div id="control-panel">
	<button on:click={() => playerStore.rotatePlayersOnePosition()}>Rodar</button>
	<button>Resetar Infiltração</button>
	<button>Posição inicial</button>
	<!-- <button> &#9881;</button> -->
</div>

{#if !$players.length}
	<div id="court" />
{:else}
	<div id="court">
		{#each $players as player}
			<PlayerComponent {player} />
		{/each}
	</div>
{/if}

<style>
	#court {
		width: 360px;
		height: 360px;
		background: #ee786a;
		border: 6px solid white;
		position: relative;
	}

	button {
		background: white;
		padding: 4px;
		border: 0;
		border-radius: 4px;
	}

	button:hover {
		cursor: pointer;
	}

	#control-panel {
		margin-bottom: 2rem;
	}
</style>
