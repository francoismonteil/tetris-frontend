import React from 'react';
import { motion } from 'framer-motion';

const StartScreen = ({ onStart }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="start-screen"
        >
            <h1>Welcome to Tetris</h1>
            <p>Press the button below to start playing</p>
            <button onClick={onStart}>Start Game</button>
        </motion.div>
    );
};

export default StartScreen;
