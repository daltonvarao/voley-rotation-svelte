<script>
	import {
		resetPlayersToInitialPosition,
		resetPlayersToRotationPosition,
		rotatePlayersPosition
	} from '$lib/store';
</script>

<div id="control-panel">
	<button on:click={resetPlayersToInitialPosition}>Posição inicial</button>
	<button on:click={resetPlayersToRotationPosition}> Resetar Infiltração</button>
	<button on:click={rotatePlayersPosition}>Rodar</button>
</div>

<style>
	#control-panel {
		margin-bottom: 1.25rem;
		display: flex;
		gap: 0.5rem;
		width: 100%;
		max-width: 360px;
	}

	#control-panel button {
		padding: 0.5rem 0.5rem;
		background: white;
		border: 0;
		font-weight: 500;
		color: #333;
		border-radius: 4px;
	}

	#control-panel button:hover {
		cursor: pointer;
	}
</style>
