export enum GAME_STATUS {
  IN_PROGRESS = "in_progress",
  PLAYER_TWO_WIN = "player_two_win",
  PLAYER_ONE_WIN = "player_one_win",
  TIE = "tie",
}

export type GameStatus =
  | GAME_STATUS.IN_PROGRESS
  | GAME_STATUS.PLAYER_TWO_WIN
  | GAME_STATUS.PLAYER_ONE_WIN
  | GAME_STATUS.TIE;

export type PlayerId = 1 | 2;
