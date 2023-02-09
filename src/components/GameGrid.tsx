import React from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import { GameGridState } from "../types/gameGridState";
import {
  fetchGridState,
  publishPlayerMove,
  makeOtherPlayerMove,
  fetchGameState,
} from "../serverSimulator";
import { GAME_STATUS } from "../types/gameStatus";

function GameGrid() {
  const {
    currentPlayerId,
    playerTurn,
    setPlayerTurn,
    setGameStatus,
    gameStatus,
  } = useGameContext();
  const [blockedBoard, setBlockedBoard] = React.useState(false);
  const [gameGridState, setGameGridState] = React.useState<GameGridState>({
    1: [],
    2: [],
  });

  React.useEffect(() => {
    if (gameStatus !== GAME_STATUS.IN_PROGRESS) {
      setBlockedBoard(true);
    }
  }, [gameStatus]);

  React.useEffect(() => {
    async function waitPlayerMove() {
      setBlockedBoard(true);
      await makeOtherPlayerMove();
      await getGameState();
      setBlockedBoard(false);
    }

    if (playerTurn !== currentPlayerId) {
      waitPlayerMove();
    }
  }, [playerTurn, currentPlayerId]);

  async function getGameState() {
    const newGameGridState = await fetchGridState();
    const newGameState = await fetchGameState();
    setGameStatus(newGameState);
    setGameGridState(newGameGridState);
    if (newGameState === GAME_STATUS.IN_PROGRESS) {
      setPlayerTurn(playerTurn === 1 ? 2 : 1);
    }
  }

  async function addChipInPosition(positionId: number) {
    setBlockedBoard(true);
    await publishPlayerMove(currentPlayerId!, positionId);
    await getGameState();
  }

  function isPositionDisabled(positionId: number) {
    return (
      gameGridState[currentPlayerId!].includes(positionId) ||
      gameGridState[currentPlayerId === 1 ? 2 : 1].includes(positionId)
    );
  }

  if (currentPlayerId) {
    return (
      <div>
        <div className="row">
          {[
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
          ].map((row: number[], rowIndex) => {
            return (
              <div key={`row-${rowIndex}`} className="row">
                {row.map((positionId: number, columnIndex) => {
                  return (
                    <StyledButton
                      key={`column-${columnIndex}`}
                      disabled={blockedBoard || isPositionDisabled(positionId)}
                      onClick={() => addChipInPosition(positionId)}
                    >
                      <div>
                        {gameGridState[currentPlayerId!].includes(positionId)
                          ? "X"
                          : gameGridState[
                              currentPlayerId === 1 ? 2 : 1
                            ].includes(positionId)
                          ? "O"
                          : ""}
                      </div>
                    </StyledButton>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return <div>Loading game...</div>;
}

const StyledButton = styled.button`
  font-size: 24px;
  width: 100px;
  height: 100px;
  margin: 10px;
  cursor: pointer;
  pointer-events: ${(props) => (props.disabled ? "none" : null)};
  position: relative;

  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default GameGrid;
