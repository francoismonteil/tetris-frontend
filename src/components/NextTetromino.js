import React, { useRef, useEffect } from 'react';

function NextTetromino({ nextTetromino }) {
    const canvasRef = useRef(null);
    const blockSize = 30;

    useEffect(() => {
        drawNextTetromino();
    }, [nextTetromino]);

    const drawNextTetromino = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        if (!nextTetromino) return;

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

    return (
        <div id="next-tetromino-container">
            <canvas id="next-tetromino" width={blockSize * 4} height={blockSize * 4} ref={canvasRef}></canvas>
        </div>
    );
}

export default NextTetromino;
