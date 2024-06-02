import React from 'react';
import { motion } from 'framer-motion';

function Controls({ handleAction, togglePause, isPaused }) {
    return (
        <div id="controls">
            {['Move Down', 'Move Left', 'Move Right', 'Rotate', 'Restart'].map(action => (
                <motion.button
                    key={action}
                    onClick={() => handleAction(`/${action.toLowerCase().replace(' ', '')}`)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {action}
                </motion.button>
            ))}
            <motion.button onClick={togglePause} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {isPaused ? 'Resume' : 'Pause'}
            </motion.button>
        </div>
    );
}

export default Controls;
