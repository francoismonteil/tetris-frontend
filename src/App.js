import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from 'styled-components';
import {motion} from 'framer-motion';
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
  border-radius: 10px;
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
      <HighScoreForm score={gameState?.score} onSubmitSuccess={handleScoreSubmitSuccess} className="overlay" />
  ), [gameState, handleScoreSubmitSuccess]);

  const highScoreTable = useMemo(() => (
      <HighScoreTable onReplay={handleReplay} className="overlay" />
  ), [handleReplay]);

  return (
      <div className="App">
        <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="overlay"
        >
          Tetris
        </motion.h1>
        <GameContainer className="overlay">
          {isGameOver ? (showHighScoreForm ? highScoreForm : highScoreTable) : (
              <>
                <GameBoardContainer className="overlay">
                  <GameBoard gameState={gameState} />
                </GameBoardContainer>
                <InfoPanel gameState={gameState} className="overlay" />
                <NextTetromino nextTetromino={gameState?.nextTetromino} className="overlay" />
                <Controls handleAction={handleAction} togglePause={togglePause} isPaused={isPaused} className="overlay" />
              </>
          )}
        </GameContainer>
      </div>
  );
}

export default App;
