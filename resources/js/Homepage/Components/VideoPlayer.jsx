import React from 'react'
import ReactPlayer from 'react-player';

function VideoPlayer({ url }) {
    return (
        <div className='player-wrapper'>
            <ReactPlayer
                className='react-player'
                controls
                playing
                muted
                url={url}
                width='100%'
                height='100%'
            />
        </div>
    )
}

export default VideoPlayer;

