import type { Player } from './player';

const mustBeBelowOf = (player: Player, relationPlayer: Player) => {
	return player.y > relationPlayer.y;
};

const mustBeAboveOf = (player: Player, relationPlayer: Player) => {
	return player.y < relationPlayer.y;
};

const mustBeLeftOf = (player: Player, relationPlayer: Player) => {
	return player.x < relationPlayer.x;
};

const mustBeRightOf = (player: Player, relationPlayer: Player) => {
	return player.x > relationPlayer.x;
};

type Rule = {
	rotationPosition: number;
	relationPosition: number;
	constraint: 'left' | 'below' | 'above' | 'right';
	validate: (player: Player, relationPlayer: Player) => boolean;
};

const rulesForPosition1: Rule[] = [
	{
		rotationPosition: 1,
		relationPosition: 2,
		constraint: 'below',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeBelowOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 1,
		relationPosition: 6,
		constraint: 'right',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeRightOf(player, relationPlayer);
		}
	}
];

const rulesForPosition2: Rule[] = [
	{
		rotationPosition: 2,
		relationPosition: 1,
		constraint: 'above',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeAboveOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 2,
		relationPosition: 3,
		constraint: 'right',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeRightOf(player, relationPlayer);
		}
	}
];

const rulesForPosition3: Rule[] = [
	{
		rotationPosition: 3,
		relationPosition: 2,
		constraint: 'left',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeLeftOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 3,
		relationPosition: 4,
		constraint: 'right',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeRightOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 3,
		relationPosition: 6,
		constraint: 'above',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeAboveOf(player, relationPlayer);
		}
	}
];

const rulesForPosition4: Rule[] = [
	{
		rotationPosition: 4,
		relationPosition: 3,
		constraint: 'left',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeLeftOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 4,
		relationPosition: 5,
		constraint: 'above',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeAboveOf(player, relationPlayer);
		}
	}
];

const rulesForPosition5: Rule[] = [
	{
		rotationPosition: 5,
		relationPosition: 4,
		constraint: 'below',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeBelowOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 5,
		relationPosition: 6,
		constraint: 'left',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeLeftOf(player, relationPlayer);
		}
	}
];

const rulesForPosition6: Rule[] = [
	{
		rotationPosition: 6,
		relationPosition: 5,
		constraint: 'right',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeRightOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 6,
		relationPosition: 1,
		constraint: 'left',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeLeftOf(player, relationPlayer);
		}
	},
	{
		rotationPosition: 6,
		relationPosition: 3,
		constraint: 'below',
		validate: (player: Player, relationPlayer: Player) => {
			return mustBeBelowOf(player, relationPlayer);
		}
	}
];

export const rulesByPosition: Rule[] = [
	...rulesForPosition1,
	...rulesForPosition2,
	...rulesForPosition3,
	...rulesForPosition4,
	...rulesForPosition5,
	...rulesForPosition6
];
