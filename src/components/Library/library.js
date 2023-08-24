import React from 'react';
import './library.css';

const Library = ({ songs, setCurrentSong }) => {
    return (
        <div className="library">
            {songs.map(song => (
                <div
                    key={song.id}
                    className={`library-song ${song.active ? 'selected' : ''}`}
                    onClick={() => setCurrentSong(song)}
                >
                    <img src={song.cover} alt={song.name} />
                    <div className="song-description">
                        <h3>{song.name}</h3>
                        <h4>{song.artist}</h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Library;