import React from 'react';
import { Video } from '../../core/types';

import './VideoShowcase.css';

function VideoShowcase(props: {
    video: Video;
    position: 'left' | 'right';
    gameOver?: boolean;
    handleHigher?: () => void;
    handleLower?: () => void;
}) {
    return (
        <div>
            <div className='next-video'>
                <img
                    className='thumbnail circle'
                    src={props.video.thumbnail}
                    alt={props.video.title}
                />
                <div className='overlay' />
                <div
                    className={`title title-${props.position} ${
                        props.gameOver ? 'go-title' : ''
                    }`}>
                    {`" ${props.video.title} "`}
                    <div className='has-text'>has</div>
                    <div>
                        {props.position === 'left' ? (
                            <div
                                className={`viewCount ${
                                    props.gameOver ? 'go-viewCount' : ''
                                }`}>
                                {props.video.viewsText}
                            </div>
                        ) : (
                            <div className='options'>
                                <button
                                    className='option higher'
                                    onClick={props.handleHigher}>
                                    Higher
                                </button>
                                <button
                                    className='option lower'
                                    onClick={props.handleLower}>
                                    Lower
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoShowcase;
