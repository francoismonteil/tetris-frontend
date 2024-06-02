import React, { useState, useEffect, useRef } from 'react';
import GameBoard from './components/GameBoard';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';
import HighScoreForm from './components/HighScoreForm';
import NextTetromino from './components/NextTetromino';
import './App.css';

const DROP_INTERVAL = 1000; // Adjust this value to control the falling speed (in milliseconds)

function App() {
  const [gameState, setGameState] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const dropIntervalId = useRef(null);

  useEffect(() => {
    fetchGameState();
  }, []);

  useEffect(() => {
    if (gameState && !gameState.gameOver) {
      startDropInterval();
    } else {
      stopDropInterval();
    }
  }, [gameState]);

  const fetchGameState = async () => {
    try {
      const response = await fetch('/gameState');
      const data = await response.json();
      setGameState(data);
      setIsGameOver(data.gameOver);
    } catch (error) {
      console.error("Failed to fetch game state:", error);
    }
  };

  const handleAction = async (action) => {
    try {
      const response = await fetch(action, { method: 'POST' });
      const data = await response.json();
      setGameState(data);
      setIsGameOver(data.gameOver);
    } catch (error) {
      console.error(`Failed to perform action ${action}:`, error);
    }
  };

  const startDropInterval = () => {
    if (dropIntervalId.current) return;
    dropIntervalId.current = setInterval(() => {
      handleAction('/moveDown');
    }, DROP_INTERVAL);
  };

  const stopDropInterval = () => {
    if (dropIntervalId.current) {
      clearInterval(dropIntervalId.current);
      dropIntervalId.current = null;
    }
  };

  return (
      <div className="App">
        <h1>Tetris</h1>
        <div className="game-container">
          <GameBoard gameState={gameState} />
          <InfoPanel gameState={gameState} />
          <NextTetromino nextTetromino={gameState?.nextTetromino} />
        </div>
        <Controls handleAction={handleAction} />
        {isGameOver && <HighScoreForm score={gameState?.score} />}
      </div>
  );
}

export default App;
