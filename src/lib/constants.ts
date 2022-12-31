import type { Position2D } from './type';

const POSITIONS_BY_ROTATION: {
	rotationPosition: number;
	position: Position2D;
}[] = [
	{ rotationPosition: 1, position: { x: 275, y: 245 } },
	{ rotationPosition: 2, position: { x: 275, y: 30 } },
	{ rotationPosition: 3, position: { x: 150, y: 30 } },
	{ rotationPosition: 4, position: { x: 25, y: 30 } },
	{ rotationPosition: 5, position: { x: 25, y: 245 } },
	{ rotationPosition: 6, position: { x: 150, y: 245 } }
];

export const PositionsByRotationMap = new Map<number, Position2D>();

POSITIONS_BY_ROTATION.map((pos) => {
	PositionsByRotationMap.set(pos.rotationPosition, pos.position);
});
