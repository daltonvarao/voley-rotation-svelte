import type { Position2D } from './type';

const POSITIONS_BY_ROTATION: {
	rotationPosition: number;
	position: Position2D;
}[] = [
	{ rotationPosition: 1, position: { x: 280, y: 260 } },
	{ rotationPosition: 2, position: { x: 280, y: 20 } },
	{ rotationPosition: 3, position: { x: 155, y: 20 } },
	{ rotationPosition: 4, position: { x: 30, y: 20 } },
	{ rotationPosition: 5, position: { x: 30, y: 260 } },
	{ rotationPosition: 6, position: { x: 155, y: 260 } }
];

export const PositionsByRotationMap = new Map<number, Position2D>();

POSITIONS_BY_ROTATION.map((pos) => {
	PositionsByRotationMap.set(pos.rotationPosition, pos.position);
});
