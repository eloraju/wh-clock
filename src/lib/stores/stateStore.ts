import type { GameState, Player, State } from "$lib/types";
import { type Writable, writable } from "svelte/store";
import { match } from "ts-pattern";

export const gameStateStore: Writable<GameState> = writable();

export function advanceRound(): void {
    gameStateStore.update((oldState) => {
        let turnNumber: number;
        let roundNumber: number;
        if (oldState.turnNumber === 2) {
            if (oldState.roundNumber === 5) {
                return {
                    ...oldState,
                    state: "END",
                };
            }
            turnNumber = 1;
            roundNumber = Math.min(oldState.roundNumber + 1, 5);
        } else {
            turnNumber = 2;
            roundNumber = oldState.roundNumber;
        }
        return {
            ...oldState,
            roundNumber,
            turnNumber,
        };
    });
}

export function switchPlayerTurn(): Error | void {
    gameStateStore.update((gameState) => {
        const state = gameState.state === "A" ? "B" : "A";
        return {
            ...gameState,
            state,
        };
    });
}

export function togglePause() {
    gameStateStore.update((gameState) => {
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
        return newState;
    });
}

export function setSecondaryPoints(
    objective: "s1" | "s2" | "s3" | "pri" | "ter",
    newPoints: number,
    turn: number
) {
    gameStateStore.update((oldState) => {
        return oldState;
    });
}

export function decrementClock() {
    gameStateStore.update((gameState) => {
        if (gameState.state === "A") {
            return {
                ...gameState,
                playerA: {
                    ...gameState.playerA,
                    timer: gameState.playerA.timer - 1,
                },
            };
        } else if (gameState.state === "B") {
            return {
                ...gameState,
                playerB: {
                    ...gameState.playerB,
                    timer: gameState.playerB.timer - 1,
                },
            };
        }

        return gameState;
    });
}

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
