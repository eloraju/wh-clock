import {
    createGameState,
    createPlayer,
    setGameState,
} from "$lib/stores/stateStore";
import type { GameState } from "$lib/types";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ data }) => {
    const { playerA, playerB, gameTime, startingPlayer, armyA, armyB } = data;
    const pA = createPlayer(playerA, armyA, gameTime, ["yo", "mama", "fat"]);
    const pB = createPlayer(playerB, armyB, gameTime, ["fat", "mama", "yo"]);
    const gameState = createGameState(pA, pB, startingPlayer);
    console.log("DATA IN PAGELOAD", JSON.stringify(data));
    setGameState(gameState as GameState);
};
