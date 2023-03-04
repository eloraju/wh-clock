import type { GameState, Player, State } from "$lib/types";
import { type Writable, writable } from "svelte/store";

export const gameStateStore: Writable<GameState> = writable();

export function advanceRound(gameState: GameState): void {
    let turnNumber: number;
    let roundNumber: number;
    if (gameState.turnNumber === 2) {
        if (gameState.roundNumber === 5) {
            gameStateStore.set({
                ...gameState,
                state: "END",
            });
            return;
        }
        turnNumber = 1;
        roundNumber = Math.min(gameState.roundNumber + 1, 5);
    } else {
        turnNumber = 2;
        roundNumber = gameState.roundNumber;
    }
    // TS doesn't know what the number from here could be even though we clamp
    // the number to 5
    gameStateStore.set({
        ...gameState,
        roundNumber,
        turnNumber,
    });
}

export function switchPlayerTurn(gameState: GameState): Error | void {
    const state = gameState.state === "A" ? "B" : "A";
    gameStateStore.set({
        ...gameState,
        state,
    });
}

export function togglePause(gameState: GameState) {
    let newState: GameState;
    if (gameState.state === "PAUSE" || gameState.state === "INIT") {
        newState = {
            ...gameState,
            state: gameState.turnBeforePause,
        };
    } else {
        newState = {
            ...gameState,
            turnBeforePause: gameState.state,
            state: "PAUSE",
        };
    }
    gameStateStore.set(newState);
}

export function decrementClock(gameState: GameState) {}

export function createPlayer(
    name: string,
    armyName: string,
    duration: number,
    secondaryNames: string[]
): Player {
    return {
        playerName: name,
        armyName,
        timer: duration,
        primaryPoints: new Array(5).fill(0),
        tertiaryPoints: new Array(5).fill(0),
        secondary1Name: secondaryNames[0],
        secondary2Name: secondaryNames[1],
        secondary3Name: secondaryNames[2],
        secondary1Points: new Array(5).fill(0),
        secondary2Points: new Array(5).fill(0),
        secondary3Points: new Array(5).fill(0),
    };
}
export function createGameState(
    playerA: Player,
    playerB: Player,
    startingPlayer: State
) {
    return {
        playerA,
        playerB,
        playerTurn: startingPlayer,
        roundNumber: 1,
        startingPlayer,
        state: "INIT",
        turnBeforePause: startingPlayer,
        turnNumber: 1,
    };
}

export function setGameState(state: GameState) {
    gameStateStore.set(state);
}
