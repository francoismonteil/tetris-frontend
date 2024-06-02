import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import GameBoard from './components/GameBoard';
import InfoPanel from './components/InfoPanel';
import Controls from './components/Controls';
import HighScoreForm from './components/HighScoreForm';
import HighScoreTable from './components/HighScoreTable';
import NextTetromino from './components/NextTetromino';
import useGameState from './hooks/useGameState';
import useDropInterval from './hooks/useDropInterval';
import './App.css';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;

  @media (min-width: 600px) {
    flex-direction: row;
  }
`;

const GameBoardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 20px auto;
  border: 2px solid #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative;
  background-color: #2d2d2d;
  width: 90vw;
  max-width: 450px;
`;

function App() {
  const { gameState, isGameOver, isPaused, setIsPaused, setGameState, setIsGameOver, fetchGameState } = useGameState();
  const [showHighScoreForm, setShowHighScoreForm] = useState(true);

  const handleAction = useCallback(async (action) => {
    try {
      const response = await fetch(action, { method: 'POST' });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setGameState(data);
      setIsGameOver(data.gameOver);
    } catch (error) {
      console.error(`Failed to perform action ${action}:`, error);
    }
  }, [setGameState, setIsGameOver]);

  useDropInterval(handleAction, isPaused, isGameOver);

  const togglePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  const handleKeyDown = useCallback((event) => {
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
  }, [gameState, isPaused, handleAction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleScoreSubmitSuccess = useCallback(() => {
    setShowHighScoreForm(false);
  }, []);

  const handleReplay = useCallback(async () => {
    try {
      await fetch('/restart', { method: 'POST' });
      setShowHighScoreForm(true);
      fetchGameState();
      setIsGameOver(false);
    } catch (error) {
      console.error('Failed to restart the game:', error);
    }
  }, [fetchGameState]);

  const highScoreForm = useMemo(() => (
      <HighScoreForm score={gameState?.score} onSubmitSuccess={handleScoreSubmitSuccess} />
  ), [gameState, handleScoreSubmitSuccess]);

  const highScoreTable = useMemo(() => (
      <HighScoreTable onReplay={handleReplay} />
  ), [handleReplay]);

  return (
      <div className="App">
        <h1>Tetris</h1>
        <GameContainer>
          {isGameOver ? (showHighScoreForm ? highScoreForm : highScoreTable) : (
              <>
                <GameBoardContainer>
                  <GameBoard gameState={gameState} />
                </GameBoardContainer>
                <InfoPanel gameState={gameState} />
                <NextTetromino nextTetromino={gameState?.nextTetromino} />
                <Controls handleAction={handleAction} togglePause={togglePause} isPaused={isPaused} />
              </>
          )}
        </GameContainer>
      </div>
  );
}

export default App;
