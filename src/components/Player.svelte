<script lang="ts">
	import { afterUpdate } from 'svelte';
	import { Player } from '../lib/player';
	import playerStore from '../lib/store';

	export let player: Player;

	let element: HTMLDivElement;

	afterUpdate(() => {
		element.style.left = player.position.x + 'px';
		element.style.top = player.position.y + 'px';
		element.style.opacity = player.opacity.toString();
	});
</script>

<div
	class="player"
	data-label={player.label}
	draggable="true"
	class:invalid={player.invalid}
	bind:this={element}
	on:dragend={function (ev) {
		ev.preventDefault();

		const courtRect = element.parentElement?.getBoundingClientRect();

		const position = {
			x: ev.clientX - player.r - (courtRect?.left ?? 0),
			y: ev.clientY - player.r - (courtRect?.top ?? 0)
		};

		playerStore.updatePlayer(
			player.rotationPosition,
			new Player({
				...player,
				position
			})
		);
	}}
	on:dragstart={function (e) {
		player.opacity = 0.3;
	}}
/>

<style>
	.player {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		position: absolute;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		top: 10px;
		color: black;
		transition: all 0.1s;
		cursor: grab;
		box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	}
	.player.invalid {
		background: red;
	}

	.player:hover {
		cursor: grabbing;
	}

	.player::after {
		content: attr(data-label);
		position: absolute;
		bottom: -24px;
		text-align: center;
		color: white;
		font-weight: 400;
		font-size: 11px;
		padding: 2px 5px;
		border-radius: 4px;
		background: rgba(0, 0, 0, 0.5);
	}
</style>
