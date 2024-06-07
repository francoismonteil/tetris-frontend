import { useEffect, useRef } from 'react';

const useDropInterval = (handleAction, isPaused, isGameOver, isGameStarted) => {
    const lastDropTimeRef = useRef(Date.now());
    const dropAnimationFrameId = useRef(null);

    const drop = () => {
        if (isGameStarted && !isPaused && !isGameOver) {
            const now = Date.now();
            const elapsed = now - lastDropTimeRef.current;

            if (elapsed >= 1000) {
                handleAction('move?direction=down');
                lastDropTimeRef.current = now;
            }

            dropAnimationFrameId.current = requestAnimationFrame(drop);
        }
    };

    useEffect(() => {
        if (isGameStarted && !isPaused && !isGameOver) {
            dropAnimationFrameId.current = requestAnimationFrame(drop);
        }

        return () => cancelAnimationFrame(dropAnimationFrameId.current);
    }, [isGameStarted, isPaused, isGameOver, handleAction]);
};

export default useDropInterval;
