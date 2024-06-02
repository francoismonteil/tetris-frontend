import React from 'react';

function InfoPanel({ gameState }) {
    if (!gameState) return null;

    return (
        <div id="info-panel">
            <p>Score: <span id="score">{gameState.score}</span></p>
            <p>Level: <span id="level">{gameState.level}</span></p>
        </div>
    );
}

export default React.memo(InfoPanel);
