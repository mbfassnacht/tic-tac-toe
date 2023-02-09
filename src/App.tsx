import React from "react";
import "./App.css";
import GameGrid from "./components/GameGrid";
import { selectPlayerId, selectStartPlayer } from "./serverSimulator";
import { useGameContext } from "./context/GameContext";

function App() {
  const {
    setPlayerId,
    setPlayerTurn,
    currentPlayerId,
    playerTurn,
    gameStatus,
  } = useGameContext();

  React.useEffect(() => {
    const playerId: any = selectPlayerId();
    const startPlayer: any = selectStartPlayer();
    setPlayerTurn(startPlayer);
    setPlayerId(playerId);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>TIC-TAC-TOE</h1>
          {currentPlayerId && (
            <div>You are the player number: {currentPlayerId}</div>
          )}
          {playerTurn && <div>Player turn: {playerTurn}</div>}
          <div>Game Status: {gameStatus}</div>
        </div>
        <GameGrid />
      </header>
    </div>
  );
}

export default App;
