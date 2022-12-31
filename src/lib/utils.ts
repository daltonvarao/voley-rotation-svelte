import { PositionsByRotationMap } from './constants';
import type { Player } from './player';

export const getPlayerByRotationPosition = (rotationPosition: number, players: Player[]) => {
	const player = players.find((player) => player.rotationPosition === rotationPosition);
	const playersRest = players.filter((player) => player.rotationPosition !== rotationPosition);

	return {
		player,
		playersRest
	};
};

export const buildPlayer = (label: string, rotationPosition: number): Player => {
	const { x, y } = PositionsByRotationMap.get(rotationPosition) ?? { x: 0, y: 0 };

	return {
		x,
		y,
		label,
		rotationPosition,
		initialRotationPosition: rotationPosition,
		invalid: false,
		r: 25,
		opacity: 1,
		highlighted: false,
		highlighter: false
	};
};
