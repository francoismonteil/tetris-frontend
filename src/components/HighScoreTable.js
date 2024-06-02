import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
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

    const Row = ({ index, style }) => (
        <div style={style} className="table-row-container">
            <div className="table-row">
                <div className="table-cell">{index + 1}</div>
                <div className="table-cell">{scores[index].name}</div>
                <div className="table-cell">{scores[index].score}</div>
            </div>
        </div>
    );

    return (
        <motion.div
            id="high-score-table"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="high-score-title">High Scores</h2>
            <div className="table-container">
                <div className="table-header">
                    <div className="table-row">
                        <div className="table-cell">Rank</div>
                        <div className="table-cell">Name</div>
                        <div className="table-cell">Score</div>
                    </div>
                </div>
                <div className="table-body">
                    <List
                        height={400} // Adjust the height as needed
                        itemCount={scores.length}
                        itemSize={50} // Adjust the size as needed
                        width="100%"
                    >
                        {Row}
                    </List>
                </div>
            </div>
            <motion.button className="replay-button" onClick={onReplay} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                Rejouer
            </motion.button>
        </motion.div>
    );
}

export default HighScoreTable;
