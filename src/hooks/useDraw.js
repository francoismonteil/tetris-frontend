import { useRef, useEffect } from 'react';

const useDraw = (drawCallback, dependencies) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            drawCallback(canvasRef.current);
        }
    }, [drawCallback, ...dependencies]);

    return canvasRef;
};

export default useDraw;
