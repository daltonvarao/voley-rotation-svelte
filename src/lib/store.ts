import { writable } from 'svelte/store';
import { PositionsByRotationMap } from './constants';
import type { Player } from './player';
import { rulesByPosition } from './rules';
import type { Position2D } from './type';
import { buildPlayer, getPlayerByRotationPosition } from './utils';

interface Store {
	players: Player[];
}

export const store = writable<Store>({
	players: [
		buildPlayer('levantador', 1),
		buildPlayer('ponteiro1', 2),
		buildPlayer('central', 3),
		buildPlayer('oposto', 4),
		buildPlayer('ponteiro2', 5),
		buildPlayer('central2', 6)
	]
});

export const updatePlayerByRotationPosition = (
	rotationPosition: number,
	updatedPlayer: Partial<Player>
) => {
	store.update((state) => {
		const { player, playersRest } = getPlayerByRotationPosition(rotationPosition, state.players);

		if (!player) return state;

		const newPlayer = {
			...player,
			...updatedPlayer
		};

		return { ...state, players: [...playersRest, newPlayer] };
	});
};

export const setPlayerPositionByRotation = (player: Player) => {
	const position = PositionsByRotationMap.get(player.rotationPosition);

	if (!position) return;

	setPlayerPosition(player, position);
};

export const setPlayerPosition = (player: Player, position: Position2D) => {
	player.x = position.x;
	player.y = position.y;

	validatePlayersPosition();
};

export const highlightRelations = (rotationPosition: number) => {
	store.update((state) => {
		const { player } = getPlayerByRotationPosition(rotationPosition, state.players);
		if (!player) return state;

		const alreadyExistsHighlighter = state.players.some(
			(p) => p.highlighter && p.rotationPosition !== player.rotationPosition
		);

		if (alreadyExistsHighlighter) {
			state.players.forEach((player) => {
				player.highlighted = false;
				player.highlighter = false;
			});
		}

		const relations = rulesByPosition.filter((rule) => rule.rotationPosition === rotationPosition);

		if (!player.highlighter) {
			player.highlighter = true;
			for (const relation of relations) {
				const { player: relationPlayer } = getPlayerByRotationPosition(
					relation.relationPosition,
					state.players
				);
				if (!relationPlayer) return state;

				relationPlayer.highlighted = true;
				relationPlayer.highlightConstraint = relation.constraint;
			}
		} else {
			player.highlighter = false;

			for (const relation of relations) {
				const { player: relationPlayer } = getPlayerByRotationPosition(
					relation.relationPosition,
					state.players
				);
				if (!relationPlayer) return state;

				relationPlayer.highlighted = false;
				relationPlayer.highlightConstraint = undefined;
			}
		}

		return state;
	});
};

export const forceHighlightRelations = (rotationPosition: number) => {
	store.update((state) => {
		const { player } = getPlayerByRotationPosition(rotationPosition, state.players);
		if (!player) return state;

		const alreadyExistsHighlighter = state.players.some(
			(p) => p.highlighter && p.rotationPosition !== player.rotationPosition
		);

		if (alreadyExistsHighlighter) {
			state.players.forEach((player) => {
				player.highlighted = false;
				player.highlighter = false;
			});
		}

		player.highlighter = true;

		const relations = rulesByPosition.filter((rule) => rule.rotationPosition === rotationPosition);
		for (const relation of relations) {
			const { player: relationPlayer } = getPlayerByRotationPosition(
				relation.relationPosition,
				state.players
			);
			if (!relationPlayer) return state;

			relationPlayer.highlighted = true;
			relationPlayer.highlightConstraint = relation.constraint;
		}

		return state;
	});
};

export const unhighlightRelations = () => {
	store.update((state) => {
		state.players.forEach((player) => {
			player.highlighted = false;
			player.highlighter = false;
		});

		return state;
	});
};

export const validatePlayersPosition = () => {
	store.update((state) => {
		for (const player of state.players) {
			const rules = rulesByPosition.filter(
				(rule) => rule.rotationPosition === player.rotationPosition
			);

			const validPositions = rules.map<boolean>((rule) => {
				const { player: relationPlayer } = getPlayerByRotationPosition(
					rule.relationPosition,
					state.players
				);

				if (!relationPlayer) return true;

				return rule.validate(player, relationPlayer);
			});

			if (validPositions.every((valid) => valid)) {
				player.invalid = false;
			} else {
				player.invalid = true;
			}
		}

		return state;
	});
};

export const resetPlayerPositionByRotation = (player: Player) => {
	store.update((state) => {
		setPlayerPositionByRotation(player);
		return state;
	});
};

export const rotatePlayersPosition = () => {
	store.update((state) => {
		state.players.forEach((player) => {
			if (player.rotationPosition === 1) {
				player.rotationPosition = 6;
			} else {
				player.rotationPosition--;
			}

			setPlayerPositionByRotation(player);
		});

		return state;
	});
};

export const resetPlayersToInitialPosition = () => {
	store.update((state) => {
		state.players.forEach((player) => {
			player.rotationPosition = player.initialRotationPosition;

			setPlayerPositionByRotation(player);
		});

		return state;
	});
};

export const resetPlayersToRotationPosition = () => {
	store.update((state) => {
		state.players.forEach((player) => {
			setPlayerPositionByRotation(player);
		});

		return state;
	});
};
