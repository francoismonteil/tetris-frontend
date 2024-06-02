import React, { useEffect, useRef } from 'react';

const useDrawGameBoard = (gameState) => {
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
        const blockSize = canvas.width / gameBoard[0].length;

        context.clearRect(0, 0, canvas.width, canvas.height);

        gameBoard.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell !== 0) {
                    context.fillStyle = getColor(cell);
                    context.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
                    context.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
                }
            });
        });

        if (currentTetromino) {
            currentTetromino.shape.forEach((row, i) => {
                row.forEach((cell, j) => {
                    if (cell !== 0) {
                        context.fillStyle = getColor(currentTetromino.type);
                        context.fillRect((currentTetromino.x + j) * blockSize, (currentTetromino.y + i) * blockSize, blockSize, blockSize);
                        context.strokeRect((currentTetromino.x + j) * blockSize, (currentTetromino.y + i) * blockSize, blockSize, blockSize);
                    }
                });
            });
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'I': return 'cyan';
            case 'J': return 'blue';
            case 'L': return 'orange';
            case 'O': return 'yellow';
            case 'S': return 'green';
            case 'T': return 'purple';
            case 'Z': return 'red';
            default: return 'gray';
        }
    };

    return canvasRef;
};

function GameBoard({ gameState }) {
    const canvasRef = useDrawGameBoard(gameState);

    return (
        <div id="game-board-container">
            <canvas id="game-board" width="300" height="600" ref={canvasRef}></canvas>
        </div>
    );
}

export default GameBoard;
