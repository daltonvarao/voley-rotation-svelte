<script lang="ts">
	import { listenToStoreUpdates, store } from '$lib/store';
	import Player from '@components/Player.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		listenToStoreUpdates();
	});
</script>

<div id="court">
	{#if $store.players.length}
		{#each $store.players as player}
			<Player {player} />
		{/each}
	{/if}
</div>

<style>
	#court {
		width: 360px;
		height: 360px;
		background: #ee786a;
		border: 6px solid white;
		position: relative;
		z-index: 100;
	}

	#court::before {
		content: '';
		border-top: 6px solid white;
		top: 125px;
		left: 0px;
		width: 100%;
		position: absolute;
	}
</style>
