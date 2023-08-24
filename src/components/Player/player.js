
import React, { useRef, useState } from 'react';
import './player.css';
import previous from '../../images/left-arrow.png'
import play from '../../images/play.png'
import next from '../../images/right-arrow.png'
import pause from '../../images/pause.png'

const Player = ({ currentSong, isPlaying, setIsPlaying, songs, setCurrentSong }) => {
    const audioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });

    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration });
    };

    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    };

    const skipTrackHandler = (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === "skip-forward") {
            setCurrentSong(songs[(currentIndex + 1) % songs.length]); 
        } else {
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                // If the user skips past the last track, it wraps around to the first track and vice versa.
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }
    };

    return (
        <div className="player">
            <div className="time-control">
                <p>{Math.floor(songInfo.currentTime / 60)}:{Math.floor(songInfo.currentTime % 60)}</p>
                <input
                    type="range"
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    onChange={dragHandler}
                />
                <p>{Math.floor(songInfo.duration / 60)}:{Math.floor(songInfo.duration % 60)}</p>
            </div>
            <div className="play-control">
                <button onClick={() => skipTrackHandler("skip-backward")} className="Previous">
                    <img src={previous} alt={previous} />
                </button>
                <button onClick={playSongHandler} className="Play">
                    {isPlaying ? <img src={pause} alt={pause} /> : <img src={play} alt={play} />}
                </button>
                <button onClick={() => skipTrackHandler("skip-forward")} className="Next">
                    <img src={next} alt={next} />
                </button>
            </div>
            <audio
                ref={audioRef}
                src={currentSong.audio}
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
            ></audio>
        </div>
    );
}

export default Player;