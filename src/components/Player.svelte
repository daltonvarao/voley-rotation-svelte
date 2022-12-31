<script lang="ts">
	import type { Player } from '../lib/player';
	import {
		forceHighlightRelations,
		highlightRelations,
		resetPlayerPositionByRotation,
		setPlayerPosition,
		unhighlightRelations
	} from '../lib/store';

	export let player: Player;
</script>

<button
	class="player {player.highlighter ? '' : player.highlightConstraint}"
	data-label={player.label}
	draggable="true"
	class:invalid={player.invalid}
	class:highlight={player.highlighted}
	class:highlighter={player.highlighter}
	style:left="{player.x}px"
	style:top="{player.y}px"
	style:opacity={player.opacity}
	on:dblclick={(e) => {
		resetPlayerPositionByRotation(player);
	}}
	on:dragstart={function (e) {
		if ('ontouchstart' in document.documentElement) {
			e.preventDefault();
			return;
		}

		player.opacity = 0.3;
		forceHighlightRelations(player.rotationPosition);
	}}
	on:dragend={function (e) {
		if ('ontouchstart' in document.documentElement) {
			e.preventDefault();
			return;
		}

		player.opacity = 1;
		const x = player.x - e.offsetX - player.r;
		const y = player.y - e.offsetY - player.r;

		setPlayerPosition(player, { x, y });
		unhighlightRelations();
	}}
	on:click={() => {
		highlightRelations(player.rotationPosition);
	}}
	on:touchstart={function (e) {
		forceHighlightRelations(player.rotationPosition);
	}}
	on:touchend={unhighlightRelations}
	on:touchmove={function (e) {
		e.preventDefault();
		player.opacity = 1;

		const [target] = e.targetTouches;
		const rect = e.currentTarget.parentElement?.getBoundingClientRect();

		if (!rect) return;

		const x = target.clientX - rect.x - player.r;
		const y = target.clientY - rect.y - player.r;

		setPlayerPosition(player, { x, y });
	}}
>
	{player.rotationPosition}
</button>

<style>
	:root {
		--highlight-trace-size: 120px;
		--player-size: 50px;
	}

	.player {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
		position: absolute;
		width: var(--player-size) !important;
		height: var(--player-size) !important;
		font-size: 16px;
		border-radius: 50%;
		top: 10px;
		color: black;
		transition: all 0.1s;
		cursor: grab;
		border: none;
		box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
	}

	.player.invalid {
		background: red !important;
		color: white !important;
	}

	.player.highlight {
		background: rgb(255, 218, 109);
		color: black;
	}

	.player.highlighter {
		background: rgb(255, 229, 151);
		color: black;
	}

	.player.highlight.right::before {
		content: '';
		background: none;
		height: var(--highlight-trace-size);
		top: calc(var(--highlight-trace-size) - var(--player-size) - 50%) px;
		left: 0px;
		position: absolute;
		border-left: 3px white dashed;
		z-index: 10;
	}

	.player.highlight.left::before {
		background: transparent;
		content: '';
		height: var(--highlight-trace-size);
		top: calc(var(--highlight-trace-size) - var(--player-size) - 50%) px;
		right: 0px;
		position: absolute;
		border-right: 3px white dashed;
		z-index: 10;
	}

	.player.highlight.above::before {
		content: '';
		width: var(--highlight-trace-size);
		left: calc(var(--highlight-trace-size) - var(--player-size) - 50%) px;
		bottom: 0px;
		position: absolute;
		border-bottom: 3px white dashed;
	}

	.player.highlight.below::before {
		content: '';
		width: var(--highlight-trace-size);
		left: calc(var(--highlight-trace-size) - var(--player-size) - 50%) px;
		top: 0px;
		position: absolute;
		border-top: 3px white dashed;
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
