export interface Player {
	x: number;
	y: number;
	r: number;
	opacity: number;
	invalid: boolean;
	rotationPosition: number;
	initialRotationPosition: number;
	label: string;
	highlighted: boolean;
	highlightConstraint?: string;
	highlighter: boolean;
}
