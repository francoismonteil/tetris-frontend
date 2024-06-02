import { useEffect, useRef } from 'react';

const useDropInterval = (handleAction, isPaused, isGameOver) => {
    const dropIntervalId = useRef(null);

    useEffect(() => {
        if (!isPaused && !isGameOver) {
            dropIntervalId.current = setInterval(() => {
                handleAction('/moveDown');
            }, 1000); // DROP_INTERVAL is now directly used
        } else {
            clearInterval(dropIntervalId.current);
            dropIntervalId.current = null;
        }

        return () => clearInterval(dropIntervalId.current);
    }, [isPaused, isGameOver, handleAction]);
};

export default useDropInterval;
