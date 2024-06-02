import { useState, useEffect, useCallback } from 'react';

const useGameState = () => {
    const [gameState, setGameState] = useState(null);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const fetchGameState = useCallback(async () => {
        try {
            const response = await fetch('/gameState');
            const data = await response.json();
            setGameState(data);
            setIsGameOver(data.gameOver);
        } catch (error) {
            console.error("Failed to fetch game state:", error);
        }
    }, []);

    useEffect(() => {
        fetchGameState();
    }, [fetchGameState]);

    return { gameState, isGameOver, isPaused, setIsPaused, setGameState, setIsGameOver, fetchGameState };
};

export default useGameState;
