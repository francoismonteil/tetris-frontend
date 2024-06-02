import React from 'react';

function Controls({ handleAction }) {
    return (
        <div id="controls">
            <button onClick={() => handleAction('/moveDown')}>Move Down</button>
            <button onClick={() => handleAction('/moveLeft')}>Move Left</button>
            <button onClick={() => handleAction('/moveRight')}>Move Right</button>
            <button onClick={() => handleAction('/rotate')}>Rotate</button>
            <button onClick={() => handleAction('/restart')}>Restart</button>
            <button onClick={() => handleAction('/togglePause')}>Pause</button>
        </div>
    );
}

export default Controls;
