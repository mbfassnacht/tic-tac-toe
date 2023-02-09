import { createContext, useContext, ReactNode, useState } from "react";
import { GAME_STATUS, GameStatus, PlayerId } from "../types/gameStatus";

type GameContextType = {
  currentPlayerId: PlayerId | undefined;
  playerTurn: PlayerId | undefined;
  gameStatus: GameStatus;
  setPlayerTurn: (id: PlayerId) => void;
  setGameStatus: (gameStatus: GameStatus) => void;
  setPlayerId: (id: PlayerId) => void;
};

const contextDefaultValues: GameContextType = {
  currentPlayerId: undefined,
  playerTurn: undefined,

  gameStatus: GAME_STATUS.IN_PROGRESS,
  setPlayerTurn: () => {},
  setGameStatus: () => {},
  setPlayerId: () => {},
};

const GameContext = createContext<GameContextType>(contextDefaultValues);

export function useGameContext() {
  return useContext(GameContext);
}

type Props = {
  children: ReactNode;
};

export function GameProvider({ children }: Props) {
  const [gameStatus, _setGameStatus] = useState(
    contextDefaultValues.gameStatus
  );

  const [currentPlayerId, _setCurrentPlayerId] = useState(
    contextDefaultValues.currentPlayerId
  );
  const [playerTurn, _setPlayerTurn] = useState(
    contextDefaultValues.playerTurn
  );

  const setGameStatus = (gameStatus: GameStatus) => {
    _setGameStatus(gameStatus);
  };

  const setPlayerId = (playerId: PlayerId) => {
    _setCurrentPlayerId(playerId);
  };

  const setPlayerTurn = (playerId: PlayerId) => {
    _setPlayerTurn(playerId);
  };

  const value = {
    playerTurn,
    gameStatus,
    currentPlayerId,
    setPlayerTurn,
    setGameStatus,
    setPlayerId,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
