import { useEffect, useRef } from 'react';

const useDropInterval = (handleAction, isPaused, isGameOver) => {
    const lastDropTimeRef = useRef(Date.now());
    const dropAnimationFrameId = useRef(null);

    const drop = () => {
        if (!isPaused && !isGameOver) {
            const now = Date.now();
            const elapsed = now - lastDropTimeRef.current;

            if (elapsed >= 1000) {
                handleAction('/moveDown');
                lastDropTimeRef.current = now;
            }

            dropAnimationFrameId.current = requestAnimationFrame(drop);
        }
    };

    useEffect(() => {
        if (!isPaused && !isGameOver) {
            dropAnimationFrameId.current = requestAnimationFrame(drop);
        }

        return () => cancelAnimationFrame(dropAnimationFrameId.current);
    }, [isPaused, isGameOver, handleAction]);
};

export default useDropInterval;
