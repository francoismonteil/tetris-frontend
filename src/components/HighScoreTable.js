import React, { useState, useEffect } from 'react';
import './../css/HighScoreTable.css';
import { motion } from 'framer-motion';

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
        <motion.div
            id="high-score-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
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
            <motion.button className="replay-button" onClick={onReplay} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                Rejouer
            </motion.button>
        </motion.div>
    );
}

export default HighScoreTable;
