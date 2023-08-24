import React from 'react';
import './search.css';

const Search = ({ setSearchTerm }) => {
    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search for a song..."
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

export default Search;
