import { useRef } from 'react';

const useSounds = () => {
    const moveSound = useRef(new Audio('/sounds/move.wav'));
    const rotateSound = useRef(new Audio('/sounds/rotate.wav'));
    const dropSound = useRef(new Audio('/sounds/drop.wav'));
    const gameOverSound = useRef(new Audio('/sounds/gameover.wav'));

    const playMoveSound = () => {
        moveSound.current.play();
    };

    const playRotateSound = () => {
        rotateSound.current.play();
    };

    const playDropSound = () => {
        dropSound.current.play();
    };

    const playGameOverSound = () => {
        gameOverSound.current.play();
    };

    return {
        playMoveSound,
        playRotateSound,
        playDropSound,
        playGameOverSound,
    };
};

export default useSounds;
