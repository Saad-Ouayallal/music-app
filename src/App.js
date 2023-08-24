import React, { useState, useEffect } from 'react';
import Song from './components/Song/song';
import Player from './components/Player/player';
import Library from './components/Library/library';
import Search from './components/Search/search';
import chillHop from './data';
import './App.css';


function App() {
  const initialSongs = chillHop();
  const [songs, setSongs] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(initialSongs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSongs, setFilteredSongs] = useState(songs);


  const changeCurrentSong = (song) => {
    setCurrentSong(song);

    // Update the active state for the songs
    const newSongs = songs.map((s) => {
      if (s.id === song.id) {
        return { ...s, active: true };
      } else {
        return { ...s, active: false };
      }
    });
    setSongs(newSongs);
  };

  // the Seach part 
  useEffect(() => {
    const results = songs.filter(song =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSongs(results);
  }, [searchTerm, songs]);


  return (
    <div className="App">
        <div className='library-container'>
          <Search setSearchTerm={setSearchTerm} />
          <Library songs={filteredSongs} setCurrentSong={changeCurrentSong} id="style-2" />
        </div>
      <div className='song-player-container'>
        <Song currentSong={currentSong} />
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          songs={songs}
          setCurrentSong={changeCurrentSong}
        />
      </div>
    </div>
  );
}

export default App;