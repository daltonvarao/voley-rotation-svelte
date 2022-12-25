import { PositionsByRotationMap } from './constants';
import type { Position2D, RotationPosition } from './type';
import { getPlayerByRotationPosition } from './utils';

export class Player {
	readonly position: Position2D = {
		x: 0,
		y: 0
	};
	r = 20;
	opacity = 1;
	invalid = false;
	rotationPosition: RotationPosition = 1;
	label = '';

	constructor(player: Partial<Player>) {
		this.r = player.r ?? this.r;
		this.opacity = player.opacity ?? this.opacity;
		this.invalid = player.invalid ?? this.invalid;
		this.position = player.position ?? this.position;
		this.label = player.label ?? this.label;
		this.rotationPosition = player.rotationPosition ?? this.rotationPosition;
		this.setPositionByRotation();
	}

	isValid(players: Player[]): boolean {
		// 1 deve estar abaixo  do 2  &&  a direita   do 6
		if (this.rotationPosition === 1) {
			return this.mustBeBelowOf(2, players) && this.mustBeRightOf(6, players);
		}
		// 2 deve estar acima   do 1  &&  a direita   do 3
		if (this.rotationPosition === 2) {
			return this.mustBeAboveOf(1, players) && this.mustBeRightOf(3, players);
		}
		// 3 deve estar acima   do 6  &&  a direita   do 4 && a esquerda do 2
		if (this.rotationPosition === 3) {
			return (
				this.mustBeAboveOf(6, players) &&
				this.mustBeRightOf(4, players) &&
				this.mustBeLeftOf(1, players)
			);
		}
		// 4 deve estar acima   do 5  &&  a esquerda  do 3
		if (this.rotationPosition === 4) {
			return this.mustBeAboveOf(5, players) && this.mustBeLeftOf(3, players);
		}
		// 5 deve estar abaixo  do 4  &&  a esquerda  do 6
		if (this.rotationPosition === 5) {
			return this.mustBeBelowOf(4, players) && this.mustBeLeftOf(6, players);
		}
		// 6 deve estar abaixo  do 3  &&  a direita   do 1 && a esquerda do 5
		if (this.rotationPosition === 6) {
			return (
				this.mustBeBelowOf(3, players) &&
				this.mustBeRightOf(4, players) &&
				this.mustBeLeftOf(1, players)
			);
		}

		return true;
	}

	validate(players: Player[]) {
		this.invalid = !this.isValid(players);
	}

	mustBeAboveOf(relationPosition: number, players: Player[]) {
		const player = getPlayerByRotationPosition(relationPosition, players);

		if (!player) return true;
		return this.position.y < player.position.y;
	}

	mustBeBelowOf(relationPosition: number, players: Player[]) {
		const player = getPlayerByRotationPosition(relationPosition, players);

		if (!player) return true;
		return this.position.y > player.position.y;
	}

	mustBeLeftOf(relationPosition: number, players: Player[]) {
		const player = getPlayerByRotationPosition(relationPosition, players);

		if (!player) return true;
		return this.position.x < player.position.x;
	}

	mustBeRightOf(relationPosition: number, players: Player[]) {
		const player = getPlayerByRotationPosition(relationPosition, players);

		if (!player) return true;
		return this.position.x > player.position.x;
	}

	setPositionByRotation() {
		const position = PositionsByRotationMap.get(this.rotationPosition);
		if (position) {
			this.setPosition(position);
		} else {
			this.setPosition({ x: 0, y: 0 });
		}
	}

	setPosition(position: Position2D) {
		this.position.x = position.x;
		this.position.y = position.y;
	}

	rotateOnePosition() {
		if (this.rotationPosition === 1) {
			this.rotationPosition = 6;
		} else {
			this.rotationPosition--;
		}
		this.setPositionByRotation();
	}
}
