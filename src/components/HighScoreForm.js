import React, { useState } from 'react';

function HighScoreForm({ score, onSubmitSuccess, onReplay }) {
    const [name, setName] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch('/submitScore', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, score }),
        });
        onSubmitSuccess();
    };

    const handleClose = () => {
        onReplay();
    };

    return (
        <div id="high-score-modal" className="modal">
            <div className="modal-content">
                <span className="close" onClick={handleClose}>&times;</span>
                <h2>Game Over!</h2>
                <p>Your Score: <span id="final-score">{score}</span></p>
                <form id="high-score-form" onSubmit={handleSubmit}>
                    <label htmlFor="player-name">Enter your name:</label>
                    <input
                        type="text"
                        id="player-name"
                        name="player-name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default HighScoreForm;
