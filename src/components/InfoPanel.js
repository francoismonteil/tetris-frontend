import React from 'react';

function InfoPanel({ gameState }) {
    if (!gameState) return null;

    return (
        <div id="info-panel">
            <p>Score: <span id="score">{gameState.score}</span></p>
            <p>Level: <span id="level">{gameState.level}</span></p>
            <div id="next-piece-container">
                <h2>Next Piece</h2>
                <div className="border-wrapper">
                    <canvas id="next-piece" width="120" height="120">
                        {gameState.nextTetromino?.shape.map((row, i) =>
                            row.map((cell, j) => (
                                <div
                                    key={`${i}-${j}`}
                                    className={`cell ${cell ? 'tetromino' : ''}`}
                                    style={{
                                        top: `${i * 30}px`,
                                        left: `${j * 30}px`,
                                        width: '30px',
                                        height: '30px',
                                    }}
                                ></div>
                            ))
                        )}
                    </canvas>
                </div>
            </div>
        </div>
    );
}

export default InfoPanel;
