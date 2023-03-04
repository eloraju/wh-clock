export type State = "INIT" | "A" | "B" | "PAUSE" | "END";

export interface Player {
  playerName: string;
  armyName: string;
  primaryPoints: number[];
  tertiaryPoints: number[];
  secondary1Name: string;
  secondary2Name: string;
  secondary3Name: string;
  secondary1Points: number[];
  secondary2Points: number[];
  secondary3Points: number[];
  timer: number;
}
export interface GameState {
  state: State;
  roundNumber: number;
  turnNumber: number;
  startingPlayer: State;
  turnBeforePause: State;
  playerA: Player;
  playerB: Player;
}