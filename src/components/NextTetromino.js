import React from 'react';
import useDraw from '../hooks/useDraw';

const drawNextTetromino = (canvas, nextTetromino) => {
    if (!nextTetromino) return;

    const context = canvas.getContext('2d');
    const blockSize = canvas.width / 4;

    context.clearRect(0, 0, canvas.width, canvas.height);

    nextTetromino.shape.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell !== 0) {
                context.fillStyle = getColor(nextTetromino.type);
                context.fillRect(j * blockSize, i * blockSize, blockSize, blockSize);
                context.strokeRect(j * blockSize, i * blockSize, blockSize, blockSize);
            }
        });
    });
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

const NextTetromino = ({ nextTetromino }) => {
    const canvasRef = useDraw(canvas => drawNextTetromino(canvas, nextTetromino), [nextTetromino]);

    return (
        <div id="next-tetromino-container">
            <canvas id="next-tetromino" width="120" height="120" ref={canvasRef}></canvas>
        </div>
    );
};

export default NextTetromino;
