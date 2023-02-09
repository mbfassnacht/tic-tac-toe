import { GameGridState } from "./types/gameGridState";
import { GAME_STATUS, PlayerId } from "./types/gameStatus";

const gameGrid: GameGridState = { 1: [], 2: [] };
const computerPlayerId: PlayerId = (Math.floor(Math.random() * 2) +
  1) as PlayerId;

export function selectPlayerId() {
  return computerPlayerId === 1 ? 2 : 1;
}

// the timeout is just to simulate a server interaction
export async function publishPlayerMove(
  playerId: PlayerId,
  positionId: number
) {
  gameGrid[playerId].push(positionId);
  return new Promise((resolve) => setTimeout(() => resolve(true), 300));
}

export function selectStartPlayer() {
  return Math.floor(Math.random() * 2) + 1;
}

// the timeout is just to simulate a server interaction
export async function fetchGridState(): Promise<GameGridState> {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ ...gameGrid }), 300)
  );
}

export async function makeOtherPlayerMove() {
  const posibleMovements = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter(
    (i: number) => ![...gameGrid[1], ...gameGrid[2]].includes(i)
  );

  const random = Math.floor(Math.random() * posibleMovements.length);

  gameGrid[computerPlayerId].push(posibleMovements[random]);
  return new Promise((resolve) => setTimeout(() => resolve(true), 300));
}

export async function fetchGameState(): Promise<GAME_STATUS> {
  let gameStatus = GAME_STATUS.IN_PROGRESS;
  const winingCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
  ];

  function containsArray(array: number[], sub: number[]) {
    return sub.every((r) => array.includes(r));
  }

  winingCombinations.forEach((winingCombination: number[]) => {
    if (
      gameStatus === GAME_STATUS.IN_PROGRESS &&
      containsArray(gameGrid[1], winingCombination)
    ) {
      gameStatus = GAME_STATUS.PLAYER_ONE_WIN;
    }
    if (
      gameStatus === GAME_STATUS.IN_PROGRESS &&
      containsArray(gameGrid[2], winingCombination)
    ) {
      gameStatus = GAME_STATUS.PLAYER_TWO_WIN;
    }
  });

  if (
    gameStatus === GAME_STATUS.IN_PROGRESS &&
    gameGrid[1].length + gameGrid[2].length >= 9
  ) {
    gameStatus = GAME_STATUS.TIE;
  }
  console.log(gameGrid);
  console.log(gameStatus);
  return new Promise((resolve) => setTimeout(() => resolve(gameStatus), 300));
}
