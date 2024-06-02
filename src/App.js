import React, { useState, useEffect, useRef, useCallback } from 'react';
import GameBoard from './components/GameBoard';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';
import HighScoreForm from './components/HighScoreForm';
import HighScoreTable from './components/HighScoreTable';
import NextTetromino from './components/NextTetromino';
import './App.css';

const DROP_INTERVAL = 1000;

const useGameState = () => {
  const [gameState, setGameState] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

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

  useEffect(() => {
    fetchGameState();
  }, []);

  return { gameState, isGameOver, isPaused, setIsPaused, setGameState, setIsGameOver, fetchGameState };
};

const useDropInterval = (handleAction, isPaused, isGameOver) => {
  const dropIntervalId = useRef(null);

  useEffect(() => {
    if (!isPaused && !isGameOver) {
      dropIntervalId.current = setInterval(() => {
        handleAction('/moveDown');
      }, DROP_INTERVAL);
    } else {
      clearInterval(dropIntervalId.current);
      dropIntervalId.current = null;
    }

    return () => clearInterval(dropIntervalId.current);
  }, [isPaused, isGameOver, handleAction]);
};

function App() {
  const { gameState, isGameOver, isPaused, setIsPaused, setGameState, setIsGameOver, fetchGameState } = useGameState();
  const [showHighScoreForm, setShowHighScoreForm] = useState(true);

  const handleAction = useCallback(async (action) => {
    try {
      const response = await fetch(action, { method: 'POST' });
      const data = await response.json();
      setGameState(data);
      setIsGameOver(data.gameOver);
    } catch (error) {
      console.error(`Failed to perform action ${action}:`, error);
    }
  }, [setGameState, setIsGameOver]);

  useDropInterval(handleAction, isPaused, isGameOver);

  const togglePause = () => setIsPaused(!isPaused);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (gameState && !gameState.gameOver && !isPaused) {
        switch (event.key) {
          case 'ArrowDown':
            handleAction('/moveDown');
            break;
          case 'ArrowLeft':
            handleAction('/moveLeft');
            break;
          case 'ArrowRight':
            handleAction('/moveRight');
            break;
          case 'ArrowUp':
            handleAction('/rotate');
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, isPaused, handleAction]);

  const handleScoreSubmitSuccess = () => {
    setShowHighScoreForm(false);
  };

  const handleReplay = async () => {
    try {
      await fetch('/restart', { method: 'POST' });
      setShowHighScoreForm(true);
      fetchGameState(); // Reset the game state
      setIsGameOver(false); // Reset the game over state
    } catch (error) {
      console.error('Failed to restart the game:', error);
    }
  };

  return (
      <div className="App">
        <h1>Tetris</h1>
        <div className="game-container">
          {isGameOver ? (
              showHighScoreForm ? (
                  <HighScoreForm score={gameState?.score} onSubmitSuccess={handleScoreSubmitSuccess} />
              ) : (
                  <HighScoreTable onReplay={handleReplay} />
              )
          ) : (
              <>
                <GameBoard gameState={gameState} />
                <InfoPanel gameState={gameState} />
                <NextTetromino nextTetromino={gameState?.nextTetromino} />
                <Controls handleAction={handleAction} togglePause={togglePause} isPaused={isPaused} />
              </>
          )}
        </div>
      </div>
  );
}

export default App;
