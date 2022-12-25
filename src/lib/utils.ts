import type { Player } from './player';

export const getPlayerByRotationPosition = (rotationPosition: number, players: Player[]) => {
	return players.find((player) => player.rotationPosition === rotationPosition);
};
