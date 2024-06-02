import React, { useEffect, useRef } from 'react';

function GameBoard({ gameState }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (gameState) {
            drawGameBoard();
        }
    }, [gameState]);

    const drawGameBoard = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!gameState || !gameState.gameBoard) return;

        const { gameBoard, currentTetromino } = gameState;
        const blockSize = 30;

        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the game board
        gameBoard.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== 0) {
                    context.fillStyle = 'gray';
                    context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                    context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
                }
            });
        });

        // Draw the current tetromino
        if (currentTetromino) {
            currentTetromino.shape.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell !== 0) {
                        context.fillStyle = 'red'; // You can change the color based on tetromino type
                        context.fillRect((currentTetromino.x + j) * blockSize, (currentTetromino.y + i) * blockSize, blockSize, blockSize);
                        context.strokeRect((currentTetromino.x + j) * blockSize, (currentTetromino.y + i) * blockSize, blockSize, blockSize);
                    }
                });
            });
        }
    };

    return (
        <div id="game-board-container">
            <canvas id="game-board" width="300" height="600" ref={canvasRef}></canvas>
        </div>
    );
}

export default GameBoard;
