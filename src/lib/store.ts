import { get, writable, type Writable } from 'svelte/store';
import { Player } from './player';

export const players = writable([
	new Player({ label: 'levantador', rotationPosition: 1 }),
	new Player({ label: 'ponteiro1', rotationPosition: 2 }),
	new Player({ label: 'central', rotationPosition: 3 }),
	new Player({ label: 'oposto', rotationPosition: 4 }),
	new Player({ label: 'ponteiro2', rotationPosition: 5 }),
	new Player({ label: 'central2', rotationPosition: 6 })
]);

export class PlayerStore {
	constructor(private readonly players: Writable<Player[]>) {}

	rotatePlayersOnePosition() {
		this.eachPlayer((player) => player.rotateOnePosition());
	}

	eachPlayer(cb: (player: Player) => void | Player) {
		this.players.update((state) => {
			state.forEach(cb);

			return state;
		});
	}

	updatePlayer(rotationPosition: number, dto: Player) {
		this.players.update((state) => {
			const { player, players } = this.getOnePlayerByRotation(rotationPosition, state);
			if (!player) return state;

			return [dto, ...players];
		});
	}

	getOnePlayerByRotation(rotationPosition: number, playersState: Player[]) {
		const player = playersState.find((p) => p.rotationPosition === rotationPosition);
		const players = playersState.filter((p) => p.rotationPosition !== rotationPosition);

		return { player, players };
	}

	getPlayerByRotationPosition(rotationPosition: number) {
		const ps = get(players);
		if (!ps.length) return;

		return ps.find((p) => p.rotationPosition === rotationPosition);
	}
}

const playerStore = new PlayerStore(players);
export default playerStore;
