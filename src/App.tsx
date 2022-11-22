import { useEffect, useState } from 'react';
import './App.css';

import { videos } from './core/data.json';
import { Video } from './core/types';
import VideoShowcase from './components/videoShowcase/VideoShowcase';
import cookie from 'react-cookies';

function App() {
    const [currentVideo, setCurrentVideo] = useState<Video>(
        getRandomVideo(videos)
    );
    const [nextVideo, setNextVideo] = useState<Video>(getRandomVideo(videos));

    const [score, setScore] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false);
    const [showDeath, setShowDeath] = useState<boolean>(false);
    const [highScore, setHighScore] = useState<number>(0);

    useEffect(() => {
        const highScore = cookie.load('highScore');
        if (highScore !== undefined) {
            setHighScore(highScore);
        }
    });

    const handleHigher = () => {
        if (currentVideo.views <= nextVideo.views) {
            correct();
        } else {
            incorrect();
        }
    };

    const handleLower = () => {
        if (currentVideo.views >= nextVideo.views) {
            correct();
        } else {
            incorrect();
        }
    };

    const correct = () => {
        let current = currentVideo;
        setCurrentVideo(nextVideo);
        setNextVideo(getRandomVideo(videos));

        if (score + 1 > highScore) {
            setHighScore(score + 1);
            cookie.save('highScore', score + 1, {
                path: '/',
                expires: new Date(2040, 1, 1),
            });
        }

        setScore(score + 1);
    };

    const incorrect = () => {
        setShowDeath(true);
        setPlaying(false);
    };

    return (
        <div className='App'>
            {playing ? (
                <div>
                    <span className='left'>
                        <VideoShowcase
                            video={currentVideo}
                            position='left'
                        />
                    </span>
                    <div className='vs-circle'>
                        <div className='vs-text'>VS</div>
                    </div>
                    <span className='right'>
                        <VideoShowcase
                            video={nextVideo}
                            position='right'
                            handleHigher={handleHigher}
                            handleLower={handleLower}
                        />
                    </span>
                    <div className='score'>Score: {score}</div>
                </div>
            ) : showDeath ? (
                <div className='death'>
                    <div>
                        <span className='left'>
                            <VideoShowcase
                                video={currentVideo}
                                position='left'
                            />
                        </span>

                        <div className='go-text'>Game Over!</div>
                        <button
                            className='play-again'
                            onClick={() => {
                                setCurrentVideo(getRandomVideo(videos));
                                setNextVideo(getRandomVideo(videos));
                                setScore(0);

                                setPlaying(true);
                                setShowDeath(false);
                            }}>
                            Play Again
                        </button>

                        <div className='vs-circle'>
                            <div className='vs-text icon'>X</div>
                        </div>
                        <span className='right'>
                            <VideoShowcase
                                video={nextVideo}
                                position='left'
                                gameOver={true}
                                handleHigher={handleHigher}
                                handleLower={handleLower}
                            />
                        </span>
                        <div className='score dead-score'>Score: {score}</div>
                    </div>
                </div>
            ) : (
                <div className='start'>
                    <h1>Welcome to "Jack Sucks At Life: Higher or Lower"!</h1>
                    <button
                        onClick={() => {
                            setPlaying(true);
                        }}
                        className='start-button'>
                        Start
                    </button>

                    <h3 className='created-by'>
                        Created with ❤️ by{' '}
                        <a
                            target='_blank'
                            href='https://twitter.com/TeakIvyYT'>
                            @TeakIvyYT
                        </a>
                    </h3>

                    <h3 className='high-score'>High Score: {highScore}</h3>
                </div>
            )}
        </div>
    );
}

export default App;

let lastGenerated: Video | null = null;
function getRandomVideo(array: Video[]): Video {
    const randomVideo = array[Math.floor(Math.random() * array.length)];

    if (lastGenerated == null || randomVideo.views === lastGenerated.views) {
        return randomVideo;
    }

    return getRandomVideo(array);
}
