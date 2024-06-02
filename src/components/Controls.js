import React from 'react';
import { FaArrowDown, FaArrowLeft, FaArrowRight, FaRedo, FaPause, FaPlay } from 'react-icons/fa';
import { FiRotateCcw } from 'react-icons/fi';
import { motion } from 'framer-motion';

function Controls({ handleAction, togglePause, isPaused }) {
    return (
        <div id="controls">
            <motion.button onClick={() => handleAction('/moveDown')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaArrowDown /> Move Down
            </motion.button>
            <motion.button onClick={() => handleAction('/moveLeft')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaArrowLeft /> Move Left
            </motion.button>
            <motion.button onClick={() => handleAction('/moveRight')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaArrowRight /> Move Right
            </motion.button>
            <motion.button onClick={() => handleAction('/rotate')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FiRotateCcw /> Rotate
            </motion.button>
            <motion.button onClick={() => handleAction('/restart')} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FaRedo /> Restart
            </motion.button>
            <motion.button onClick={togglePause} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {isPaused ? <FaPlay /> : <FaPause />} {isPaused ? 'Resume' : 'Pause'}
            </motion.button>
        </div>
    );
}

export default Controls;
