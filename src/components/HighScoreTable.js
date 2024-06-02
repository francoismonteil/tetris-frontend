import React, { useState, useEffect } from 'react';
import './../css/HighScoreTable.css';

function HighScoreTable({ onReplay }) {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch('/highScores');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setScores(data);
                } else {
                    console.error("API response is not an array:", data);
                }
            } catch (error) {
                console.error("Failed to fetch scores:", error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div id="high-score-table">
            <h2>High Scores</h2>
            <table>
                <thead>
                <tr>
                    <th>Rank</th>
                    <th>Name</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {scores.map((score, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{score.name}</td>
                        <td>{score.score}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button className="replay-button" onClick={onReplay}>Rejouer</button>
        </div>
    );
}

export default HighScoreTable;
